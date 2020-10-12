const CreateDropdown      = require('@binary-com/binary-style').selectDropdown;
const getHighstock        = require('../common').requireHighstock;
const Defaults            = require('../defaults');
const Symbols             = require('../symbols');
const BinarySocket        = require('../../../base/socket');
const getSymbolsForMarket = require('../../../common/active_symbols').getSymbolsForMarket;
const addComma            = require('../../../../_common/base/currency_base').addComma;
const localize            = require('../../../../_common/localize').localize;
const State               = require('../../../../_common/storage').State;
const template            = require('../../../../_common/utility').template;

const DigitInfo = (() => {
    let spots          = [];
    let stream_id      = null;
    // To avoid too many greens and reds
    let prev_min_index = -1;
    let prev_max_index = -1;

    let chart;

    const chart_config = {
        chart: {
            renderTo           : 'last_digit_histo',
            defaultSeriesType  : 'column',
            backgroundColor    : 'var(--border-normal)',
            borderWidth        : 1,
            borderColor        : 'var(--border-normal)',
            plotBackgroundColor: 'var(--fill-normal)',
            plotBorderWidth    : 1,
            plotBorderColor    : 'var(--border-normal)',
            height             : 225, // This is "unresponsive", but so is leaving it empty where it goes to 400px.
        },
        title    : { text: '' },
        credits  : { enabled: false },
        exporting: { enabled: false },
        legend   : {
            enabled: false,
        },
        tooltip: {
            borderWidth : 0,
            borderRadius: 4,
            formatter() {
                const total      = $('#tick_count').val();
                const percentage = (this.y / total) * 100;
                return `<strong>${localize('Digit')}:</strong> ${this.x}<br/><strong>${localize('Percentage')}:</strong> ${percentage.toFixed(1)}%`;
            },
        },
        plotOptions: {
            column: {
                shadow      : false,
                borderWidth : 0.5,
                borderColor : 'var(--border-normal)',
                pointPadding: 0,
                groupPadding: 0.0,
                color       : 'var(--general-section-1)',
            },
            series: {
                dataLabels: {
                    enabled    : true,
                    borderWidth: 0,
                    style      : {
                        textShadow: false,
                    },
                    formatter() {
                        const total      = $('#tick_count').val();
                        const percentage = (this.point.y / total) * 100;
                        return `${percentage.toFixed(2)}%`;
                    },
                },
            },
        },
        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            lineWidth : 0,
            lineColor : 'var(--border-normal)',
            tickLength: 10,
            tickWidth : 0,
            tickColor : 'var(--border-normal)',
        },
        yAxis: {
            title        : { text: '' },
            maxPadding   : 0,
            gridLineColor: 'var(--general-section-1)',
            tickWidth    : 1,
            tickLength   : 3,
            tickColor    : 'var(--border-normal)',
            lineColor    : 'var(--border-normal)',
            endOnTick    : true,
            opposite     : false,
            labels       : {
                align  : 'left',
                x      : 0,
                enabled: false,
                formatter() {
                    const total      = $('#tick_count').val();
                    const percentage = parseInt((this.value / total) * 100);
                    return `${percentage}%`;
                },
            },
        },
    };

    const addContent = (underlying) => {
        const domain  = document.domain.split('.').slice(-2).join('.');
        const symbols = getSymbolsForMarket(State.getResponse('active_symbols'), Defaults.get('market'));

        let elem = '';
        Object.keys(symbols).forEach((symbol) => {
            elem += `<option value="${symbol}">${symbols[symbol].display}</option>`;
        });

        $('#digit_underlying').html($(elem)).val(underlying);
        $('#digit_domain').text(domain.charAt(0).toUpperCase() + domain.slice(1));
        $('#digit_info_underlying').text($('#digit_underlying option:selected').text());
        CreateDropdown('#digit_underlying');
        CreateDropdown('#tick_count');
    };

    const onLatest = () => {
        const getLatest = () => {
            const $digit_underlying_option = $('#digit_underlying option:selected');
            const symbol                   = $digit_underlying_option.val();
            const count                    = $('#tick_count').val();
            $('#digit_info_underlying').text($digit_underlying_option.text());
            $('#digit_info_count').text(count);
            const request = {
                ticks_history: symbol,
                end          : 'latest',
                count,
            };
            if (chart.series[0].name !== symbol) {
                if ($('#underlying').find('option:selected').val() !== $('#digit_underlying').val()) {
                    request.subscribe = 1;
                    request.style     = 'ticks';
                }
                if (stream_id !== null) {
                    BinarySocket.send({ forget: stream_id });
                    stream_id = null;
                }
            }
            BinarySocket.send(request, { callback: async (response) => {
                const type = response.msg_type;
                if (type === 'tick') {
                    updateChart(response);
                } else if (type === 'history') {
                    await showChart(response.echo_req.ticks_history, response.history.prices);
                }
            } });
        };
        $('#digit_underlying, #tick_count').off('change').on('change', getLatest);
    };

    const showChart = async (underlying, underlying_spots) => {
        if (underlying_spots.length !== +$('#tick_count').val()) return;

        const decimal_places             = await Symbols.getUnderlyingPipSize(underlying);
        const formatted_underlying_spots = underlying_spots.map(price => addComma(price, decimal_places).replace(',', ''));

        getHighstock((Highcharts) => {
            const new_spots = formatted_underlying_spots;
            if (typeof new_spots === 'undefined' || new_spots.length <= 0) {
                return;
            }
            const dec = new_spots[0].split('.')[1].length;
            for (let i = 0; i < new_spots.length; i++) {
                const val    = parseFloat(new_spots[i]).toFixed(dec);
                new_spots[i] = val.substr(val.length - 1);
            }

            const getTitle = () => (
                {
                    text: template($('#last_digit_title').html(), [new_spots.length, $('#digit_underlying option:selected').text()]),
                }
            );

            spots = new_spots;
            if (chart) chart.destroy();
            addContent(underlying); // this creates #last_digit_title
            chart_config.xAxis.title = getTitle();
            chart = new Highcharts.Chart(chart_config);
            chart.addSeries({ name: underlying, data: [] });
            onLatest();
            update();
        });
    };

    const update = (symbol, latest_spot) => {
        if (typeof chart === 'undefined') {
            return null;
        }

        const series = chart.series[0]; // Where we put the final data.
        if (typeof latest_spot !== 'undefined' && series.name === symbol) {
            spots.push(latest_spot.slice(-1)); // Only last digit matters
            spots.shift();
        }

        // Always recompute and draw, even if theres no new data.
        // This is especially useful on first request, but maybe in other ways.
        const filtered_spots  = [];
        const filterFunc      = el => +el === digit;
        let digit             = 10;
        const min_max_counter = [];
        while (digit--) {
            const val             = spots.filter(filterFunc).length;
            filtered_spots[digit] = val;
            if (typeof min_max_counter[val] === 'undefined') {
                min_max_counter[val] = 0;
            }
            min_max_counter[val]++;
        }
        const min       = Math.min.apply(null, filtered_spots);
        const max       = Math.max.apply(null, filtered_spots);
        const min_index = filtered_spots.indexOf(min);
        const max_index = filtered_spots.indexOf(max);
        // changing color
        if (min_max_counter[min] >= 1) {
            filtered_spots[min_index] = { y: min, color: 'var(--status-danger)' };
            if (prev_min_index === -1) {
                prev_min_index = min_index;
            } else if (prev_min_index !== min_index) {
                if (typeof filtered_spots[prev_min_index] === 'object') {
                    filtered_spots[prev_min_index] = { y: filtered_spots[prev_min_index].y, color: 'var(--general-section-1)' };
                } else {
                    filtered_spots[prev_min_index] = { y: filtered_spots[prev_min_index], color: 'var(--general-section-1)' };
                }
                prev_min_index = min_index;
            }
        }

        if (min_max_counter[max] >= 1) {
            filtered_spots[max_index] = { y: max, color: 'var(--status-success)' };
            if (prev_max_index === -1) {
                prev_max_index = max_index;
            } else if (prev_max_index !== max_index) {
                if (typeof filtered_spots[prev_max_index] === 'object') {
                    filtered_spots[prev_max_index] = { y: filtered_spots[prev_max_index].y, color: 'var(--general-section-1)' };
                } else {
                    filtered_spots[prev_max_index] = { y: filtered_spots[prev_max_index], color: 'var(--general-section-1)' };
                }
                prev_max_index = max_index;
            }
        }
        return series.setData(filtered_spots);
    };

    const updateChart = async (tick) => {
        const decimal_places = await Symbols.getUnderlyingPipSize(tick.tick.symbol);
        if (stream_id) {
            if (chart.series[0].name === tick.tick.symbol) {
                stream_id = tick.tick.id || null;
                update(tick.tick.symbol, tick.tick.quote);
            } else {
                BinarySocket.send({ forget: (tick.tick.id).toString() });
            }
        } else {
            update(tick.tick.symbol, addComma(tick.tick.quote, decimal_places).replace(',', ''));
        }
    };

    return {
        showChart,
        updateChart,
    };
})();

module.exports = DigitInfo;
