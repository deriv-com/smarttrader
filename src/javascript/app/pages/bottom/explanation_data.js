import { localize } from '../../../_common/localize.js';

/* eslint-disable quotes */
export const contractExplanationData = {
    winning: {
        asian: {
            
            content: [
                localize('Asian options settle by comparing the <strong>last tick</strong> with the average spot over the period.'),
                localize('Asian options settle by comparing the <strong>last tick</strong> with the average spot over the period.'),
                localize('If you select "Asian Rise", you will win the payout if the <strong>last tick</strong> is <strong>higher</strong> than the <strong>average</strong> of the ticks.'),
                localize('If you select "Asian Fall", you will win the payout if the <strong>last tick</strong> is <strong>lower</strong> than the <strong>average</strong> of the ticks.'),
                localize('If the <strong>last tick</strong> is equal to the average of the ticks, you don\'t win the payout.'),
            ],
        },
        digits: {
            
            content: [
                localize('If you select "Matches", you will win the payout if the <strong>last digit</strong> of the last tick is the <strong>same</strong> as your <strong>prediction.</strong>'),
                localize('If you select "Differs", you will win the payout if the <strong>last digit</strong> of the last tick is <strong>not the same</strong> as your <strong>prediction</strong>.'),
            ],
        },
        endsinout: {
            
            content: [
                localize('If you select "Ends Between", you win the payout if the <strong>exit spot</strong> is strictly higher than the <strong>Low barrier</strong> AND strictly lower than the <strong>High barrier</strong>.'),
                localize('If you select "Ends Outside", you win the payout if the <strong>exit spot</strong> is EITHER strictly higher than the <strong>High barrier</strong>, OR strictly lower than the <strong>Low barrier</strong>.'),
                localize('If the <strong>exit spot</strong> is equal to either the <strong>Low barrier</strong> or the <strong>High barrier</strong>, you don\'t win the payout.'),
            ],
        },
        evenodd: {
            
            content: [
                localize('If you select "Even", you will win the payout if the <strong>last digit</strong> of the last tick is an <strong>even number (i.e., 2, 4, 6, 8, or 0).</strong>'),
                localize('If you select "Odd", you will win the payout if the <strong>last digit</strong> of the last tick is an <strong>odd number (i.e., 1, 3, 5, 7, or 9).</strong>'),
            ],
        },
        higherlower: {
            
            content: [
                localize('If you select "Higher", you win the payout if the <strong>exit spot</strong> is strictly higher than the <strong>barrier</strong>.'),
                localize('If you select "Lower", you win the payout if the <strong>exit spot</strong> is strictly lower than the <strong>barrier</strong>.'),
                "If the <strong>exit spot</strong> is equal to the <strong>barrier</strong>, you don't win the payout.",
            ],
        },
        overunder: {
            
            content: [
                localize('If you select "Over", you will win the payout if the <strong>last digit</strong> of the last tick is <strong>greater than your prediction.</strong>'),
                localize('If you select "Under", you will win the payout if the <strong>last digit</strong> of the last tick is <strong>less than your prediction.</strong>'),
            ],
        },
        risefall: {
            
            content: [
                localize('If you select "Rise", you win the payout if the <strong>exit spot</strong> is strictly higher than the <strong>entry spot</strong>.'),
                localize('If you select "Fall", you win the payout if the <strong>exit spot</strong> is strictly lower than the <strong>entry spot</strong>.'),
                localize('If you select "Allow equals", you win the payout if exit spot is higher than or equal to entry spot for "Rise". Similarly, you win the payout if exit spot is lower than or equal to entry spot for "Fall".'),
            ],
        },
        runbet_lucky10: {
            
            content: [
                localize('You win the payout if the market price ends in the digit you have selected.'),
            ],
        },
        runbet_quick10: {
            
            content: [
                localize('You win the payout if the market price does not end in the digit you have selected.'),
            ],
        },
        runbet_updown: {
            
            content: [
                localize('If you select "rises", you win the payout if the market price is higher than the <strong>entry spot</strong>.'),
                localize('If you select "falls", you win the payout if the market price is lower than the <strong>entry spot</strong>.'),
            ],
        },
        staysinout: {
            
            content: [
                localize('If you select "Stays Between", you win the payout if the market stays between (does not touch) either the <strong>High barrier</strong> or the <strong>Low barrier</strong> at any time during the <strong>contract period</strong>.'),
                localize('If you select "Goes Outside", you win the payout if the market touches either the <strong>High barrier</strong> or the <strong>Low barrier</strong> at any time during the <strong>contract period</strong>.'),
            ],
        },
        ticks: {
            
            content: [
                localize('If you select "Rises", you win the payout if the <strong>exit spot</strong> is strictly higher than the <strong>entry spot</strong>.'),
                localize('If you select "Falls", you win the payout if the <strong>exit spot</strong> is strictly lower than the <strong>entry spot</strong>.'),
            ],
        },
        touchnotouch: {
            
            content: [
                localize('If you select "Touches", you win the payout if the market touches the <strong>barrier</strong> at any time during the <strong>contract period</strong>.'),
                localize('If you select "Does Not Touch", you win the payout if the market never touches the <strong>barrier</strong> at any time during the <strong>contract period</strong>.'),
            ],
        },
        updown: {
            
            content: [
                localize('If you select "rises", you win the payout if the market price is higher than the entry spot.'),
                localize('If you select "falls", you win the payout if the market price is lower than the entry spot.'),
            ],
        },
        lookbacklow: {
            title  : 'Pay-out' ,
            content: [
                localize('By purchasing the <strong>"Close-Low"</strong> contract, you\'ll win the multiplier times the difference between the <strong>close</strong> and <strong>low</strong> over the duration of the contract.'),
            ],
        },
        lookbackhigh: {
            title  : 'Pay-out' ,
            content: [
                localize('By purchasing the <strong>"High-Close"</strong> contract, you\'ll win the multiplier times the difference between the <strong>high</strong> and <strong>close</strong> over the duration of the contract.'),
            ],
        },
        lookbackhighlow: {
            title  : 'Pay-out' ,
            content: [
                localize('By purchasing the <strong>"High-Low"</strong> contract, you\'ll win the multiplier times the difference between the <strong>high</strong> and <strong>low</strong> over the duration of the contract.'),
            ],
        },
        reset: {
            
            content: [
                localize('If you select "Reset-Call", you win the payout if the exit spot is strictly higher than either the entry spot or the spot at reset time.'),
                localize('If you select "Reset-Put", you win the payout if the exit spot is strictly lower than either the entry spot or the spot at reset time.'),
                "If the <strong>exit spot</strong> is equal to the <strong>barrier</strong> or the <strong>new barrier (if a reset occurs)</strong>, you don't win the payout.",
            ],
        },
        highlowticks: {
            
            content: [
                localize('If you select <strong>"High Tick"</strong>, you win the payout if the selected tick is the <strong>highest among the next five ticks</strong>.'),
                localize('If you select <strong>"Low Tick"</strong>, you win the payout if the selected tick is the <strong>lowest among the next five ticks</strong>.'),
            ],
        },
        runs: {
            
            content: [
                localize('If you select <strong>"Only Ups"</strong>, you win the payout if consecutive ticks rise successively after the <strong>entry spot</strong>.<br />No payout if any tick falls or is equal to any of the previous ticks.'),
                localize('If you select <strong>"Only Downs"</strong>, you win the payout if consecutive ticks fall successively after the <strong>entry spot</strong>.<br />No payout if any tick rises or is equal to any of the previous ticks.'),
            ],
        },
    },
    image: {
        explanation_image_1:
  '/images/pages/trade-explanation/en/rises.svg?3e9b01f8f3365272abe03784db97d968' ,
        explanation_image_2:
  '/images/pages/trade-explanation/en/falls.svg?3e9b01f8f3365272abe03784db97d968' ,
    },
    explain: {
        asian: {
            title  : localize('Entry Spot') ,
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.'),
            ],
            title_secondary  : localize('The Average') ,
            content_secondary: [
                localize('The average is the average of the ticks, including the entry spot and the last tick.'),
            ],
        },
        digits: {
            title  : localize('Entry Spot') ,
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.'),
            ],
        },
        endsinout: {
            title  : localize('Exit spot') ,
            content: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).'),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.'),
            ],
        },
        evenodd: {
            title  : localize('Entry Spot') ,
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.'),
            ],
        },
        higherlower: {
            title  : localize('Exit spot') ,
            content: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).'),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.'),
            ],
        },
        overunder: {
            title  : localize('Entry Spot') ,
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.'),
            ],
        },
        risefall: {
            title  : localize('Entry spot') ,
            content: [
                localize('The <strong>start time</strong> is when the contract is processed by our servers and the <strong>entry spot</strong> is the <strong>next tick</strong> thereafter.'),
                localize('If you select a <strong>start time</strong> in the future, the <strong>start time</strong> is that which is selected and the <strong>entry spot</strong> is the price in effect at that time.'),
            ],
            title_secondary  : localize('Exit spot') ,
            content_secondary: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.'),
                localize('If you select a <strong>start time</strong> of "Now", the <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).'),
                localize('If you select a specific <strong>end time</strong>, the <strong>end time</strong> is the selected time.'),
            ],
        },

        staysinout: {
            title  : localize('Contract period') ,
            content: [
                localize('The <strong>contract period</strong> is the period between the <strong>next tick</strong> after the <strong>start time</strong> and the <strong>end time</strong>.'),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).'),
            ],
        },
        touchnotouch: {
            title  : localize('Contract period') ,
            content: [
                localize('The <strong>contract period</strong> is the period between the <strong>next tick</strong> after the <strong>start time</strong> and the <strong>end time</strong>.'),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).'),
            ],
        },
        lookbacklow: {
            title  : localize('High, Low and Close') ,
            content: [
                localize('The <strong>high</strong> is the highest point ever reached by the market during the contract period.'),
                localize('The <strong>low</strong> is the lowest point ever reached by the market during the contract period.'),
                localize('The <strong>close</strong> is the latest tick at or before the <strong>end time</strong>. If you selected a specific <strong>end time,</strong> the <strong>end time</strong> is the selected time.'),
            ],
            title_secondary  : localize('Contract period') ,
            content_secondary: [
                localize('The <strong>contract period</strong> is the period between the <strong>first tick</strong> (after start time) and the <strong>end time</strong>.'),
                localize('The <strong>start time</strong> begins when the contract is processed by our servers.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong>.'),
            ],
        },
        lookbackhigh: {
            title  : localize('High, Low and Close') ,
            content: [
                localize('The <strong>high</strong> is the highest point ever reached by the market during the contract period.'),
                localize('The <strong>low</strong> is the lowest point ever reached by the market during the contract period.'),
                localize('The <strong>close</strong> is the latest tick at or before the <strong>end time</strong>. If you selected a specific <strong>end time,</strong> the <strong>end time</strong> is the selected time.'),
            ],
            title_secondary  : localize('Contract period') ,
            content_secondary: [
                localize('The <strong>contract period</strong> is the period between the <strong>first tick</strong> (after start time) and the <strong>end time</strong>.'),
                localize('The <strong>start time</strong> begins when the contract is processed by our servers.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong>.'),
            ],
        },
        lookbackhighlow: {
            title  : localize('High, Low and Close') ,
            content: [
                localize('The <strong>high</strong> is the highest point ever reached by the market during the contract period.'),
                localize('The <strong>low</strong> is the lowest point ever reached by the market during the contract period.'),
                localize('The <strong>close</strong> is the latest tick at or before the <strong>end time</strong>. If you selected a specific <strong>end time,</strong> the <strong>end time</strong> is the selected time.'),
            ],
            title_secondary  : localize('Contract period') ,
            content_secondary: [
                localize('The <strong>contract period</strong> is the period between the <strong>first tick</strong> (after start time) and the <strong>end time</strong>.'),
                localize('The <strong>start time</strong> begins when the contract is processed by our servers.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong>.'),
            ],
        },
        reset: {
            title  : localize('Reset Time') ,
            content: [
                localize('At reset time, if the spot is in the opposite direction of your prediction, the barrier is reset to that spot.'),
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.'),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong>.'),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.'),
                localize('The <strong>entry spot</strong> is the first tick after the contract is processed by our servers.'),
            ],
        },
        highlowticks: {
            title  : localize('Entry Spot') ,
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.'),
            ],
        },
        runs: {
            title  : localize('Entry spot') ,
            content: [
                localize('The <strong>start time</strong> is when the contract has been processed by our servers and the <strong>entry spot</strong> is the <strong>next tick</strong> thereafter.'),
            ],
            title_secondary  : localize('Exit Spot'),
            content_secondary: [
                localize('The <strong>exit spot</strong> is the last tick when the contract ends. Contract ends when all ticks rise or fall successively, or when a single tick breaks the predicted pattern.'),
            ],
        },
    },
    note: {
        asian: {
            
            content: [
                localize('Asian contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.'),
            ],
        },
        digits: {
            
            content: [
                localize('Digit contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.'),
            ],
        },
        endsinout: {
            
            content: [
                localize('Ends Between/Ends Outside contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.'),
            ],
        },
        evenodd: {
            
            content: [
                localize('Even/Odd contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.'),
            ],
        },
        higherlower: {
            
            content: [
                localize('Higher/Lower contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.'),
            ],
        },
        overunder: {
            
            content: [
                localize('Over/Under contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.'),
            ],
        },
        risefall: {
            
            content: [
                localize('Rise/Fall contracts will be refunded if: <br />'),
                localize(' • There are less than 2 ticks between the start and end times <br />'),
                localize(' • The contract doesn\'t end within 5 minutes (for tick duration contracts'),
        
            ],
        },
        staysinout: {
            
            content: [
                localize('Stays Between/Goes Outside Contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.'),
            ],
        },
        touchnotouch: {
            content: [
                localize('Touch/No Touch contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.'),
            ],
        },
        highlowticks: {
            content: [
                localize('High Tick/Low Tick contracts have a strict duration of five ticks.'),
            ],
        },
    },
};
