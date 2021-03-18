const ProfitTable = require('./profit_table');
const Client      = require('../../../../base/client');
const Table       = require('../../../../common/attach_dom/table');
const Currency    = require('../../../../common/currency');
const showTooltip = require('../../../../common/get_app_details').showTooltip;
const localize    = require('../../../../../_common/localize').localize;

const ProfitTableUI = (() => {
    let oauth_apps   = {};
    let total_profit = 0;

    let currency;

    const profit_table_id = 'profit-table';
    const cols            = ['contract', 'ref', 'currency', 'buy-time', 'buy-price', 'sell-time', 'sell-price', 'pl', 'details'];

    const createEmptyTable = () => {
        const header = [
            localize('Contract details'),
            localize('Ref. ID'),
            localize('Currency'),
            localize('Buy time'),
            localize('Buy price'),
            localize('Sell time'),
            localize('Sell price'),
            localize('Profit/Loss'),
            localize('Details'),
        ];

        currency = Client.get('currency');

        const footer = [localize('Total Profit/Loss'), '', '', '', '', '', '', '', ''];

        const data     = [];
        const metadata = {
            cols,
            id: profit_table_id,
        };
        const $table_container = Table.createFlexTable(data, metadata, header, footer);

        $table_container
            .children('table')
            .children('tfoot')
            .children('tr')
            .attr('id', 'pl-day-total');

        return $table_container;
    };

    const updateFooter = (transactions) => {
        total_profit += transactions.reduce((previous, current) => {
            const buy_price  = Number(parseFloat(current.buy_price));
            const sell_price = Number(parseFloat(current.sell_price));
            const pl         = sell_price - buy_price;
            return previous + pl;
        }, 0);

        const sub_total_type = (total_profit >= 0) ? 'profit' : 'loss';

        $('#pl-day-total').find(' > .pl').html(Currency.formatMoney(currency, Number(total_profit), true))
            .removeClass('profit loss')
            .addClass(sub_total_type);
    };

    const createProfitTableRow = (transaction) => {
        const profit_table_data = ProfitTable.getProfitTabletData(transaction);
        const pl_type           = Number(transaction.sell_price - transaction.buy_price) >= 0 ? 'profit' : 'loss';

        const data = [
            '',
            `<span ${showTooltip(profit_table_data.app_id, oauth_apps[profit_table_data.app_id])}>${profit_table_data.ref}</span>`,
            currency,
            profit_table_data.buyDate,
            profit_table_data.buyPrice,
            profit_table_data.sellDate,
            profit_table_data.sellPrice,
            profit_table_data.pl,
            '',
        ];
        const $row = Table.createFlexTableRow(data, cols, 'data');

        $row.children('.pl').addClass(pl_type);
        $row.children('.contract').html(`${profit_table_data.desc}<br>`);
        $row.children('.contract').css('width','200px');
        $row.children('.buy-time, .sell-time').each(function () {
            $(this).wrapInner('<div class="new-width"></div>');
        });

        // TODO: remove ico exception when all ico contracts are removed
        if (!/binaryico/i.test(profit_table_data.shortcode)) {
            // create view button and append
            const $view_button = $('<button/>', { class: 'button open_contract_details', text: localize('View'), contract_id: profit_table_data.id });
            $row.children('.contract,.details').append($view_button);
        }

        return $row[0];
    };

    const updateProfitTable = (transactions) => {
        Table.appendTableBody(profit_table_id, transactions, createProfitTableRow);
        updateFooter(transactions);
    };

    const clearTableContent = () => {
        Table.clearTableBody(profit_table_id);
        $(`#${profit_table_id}`).find('> tfoot').hide();
        total_profit = 0;
    };

    const errorMessage = (msg) => {
        const $err = $('#profit-table-container').find('#error-msg');
        if (msg) {
            $err.setVisibility(1).text(msg);
        } else {
            $err.setVisibility(0).text('');
        }
    };

    return {
        createEmptyTable,
        updateProfitTable,
        errorMessage,
        cleanTableContent: clearTableContent,
        setOauthApps     : values => (oauth_apps = values),
    };
})();

module.exports = ProfitTableUI;
