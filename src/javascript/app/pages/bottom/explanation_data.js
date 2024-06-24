import { localize } from '../../../_common/localize';

export const contractExplanationData = {
    winning: {
        asian: {
            title  : localize('Winning the contract'),
            content: [
                localize('Asian options settle by comparing the [_1]last tick[_2] with the average spot over the period.', ['<strong>', '</strong>']),
                localize('Asian options settle by comparing the [_1]last tick[_2] with the average spot over the period.',['<strong>', '</strong>']),
                localize('If you select "Asian Rise", you will win the payout if the [_1]last tick[_2] is [_1]higher[_2] than the [_1]average[_2] of the ticks.',['<strong>', '</strong>']),
                localize('If you select "Asian Fall", you will win the payout if the [_1]last tick[_2] is [_1]lower[_2] than the [_1]average[_2] of the ticks.',['<strong>', '</strong>']),
                localize('If the [_1]last tick[_2] is equal to the average of the ticks, you don\'t win the payout.',['<strong>', '</strong>']),
            ],
        },
        digits: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Matches", you will win the payout if the [_1]last digit[_2] of the last tick is the [_1]same[_2] as your [_1]prediction.[_2]',['<strong>', '</strong>']),
                localize('If you select "Differs", you will win the payout if the [_1]last digit[_2] of the last tick is [_1]not the same[_2] as your [_1]prediction[_2].',['<strong>', '</strong>']),
            ],
        },
        endsinout: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Ends Between", you win the payout if the [_1]exit spot[_2] is strictly higher than the [_1]Low barrier[_2] AND strictly lower than the [_1]High barrier[_2].',['<strong>', '</strong>']),
                localize('If you select "Ends Outside", you win the payout if the [_1]exit spot[_2] is EITHER strictly higher than the [_1]High barrier[_2], OR strictly lower than the [_1]Low barrier[_2].',['<strong>', '</strong>']),
                localize('If the [_1]exit spot[_2] is equal to either the [_1]Low barrier[_2] or the [_1]High barrier[_2], you don\'t win the payout.',['<strong>', '</strong>']),
            ],
        },
        evenodd: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Even", you will win the payout if the [_1]last digit[_2] of the last tick is an [_1]even number (i.e., 2, 4, 6, 8, or 0).[_2]',['<strong>', '</strong>']),
                localize('If you select "Odd", you will win the payout if the [_1]last digit[_2] of the last tick is an [_1]odd number (i.e., 1, 3, 5, 7, or 9).[_2]',['<strong>', '</strong>']),
            ],
        },
        higherlower: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Higher", you win the payout if the [_1]exit spot[_2] is strictly higher than the [_1]barrier[_2].',['<strong>', '</strong>']),
                localize('If you select "Lower", you win the payout if the [_1]exit spot[_2] is strictly lower than the [_1]barrier[_2].',['<strong>', '</strong>']),
                localize('If the [_1]exit spot[_2] is equal to the [_1]barrier[_2], you don\'t win the payout.',['<strong>', '</strong>']),
            ],
        },
        overunder: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Over", you will win the payout if the [_1]last digit[_2] of the last tick is [_1]greater than your prediction.[_2]',['<strong>', '</strong>']),
                localize('If you select "Under", you will win the payout if the [_1]last digit[_2] of the last tick is [_1]less than your prediction.[_2]',['<strong>', '</strong>']),
            ],
        },
        risefall: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Rise", you win the payout if the [_1]exit spot[_2] is strictly higher than the [_1]entry spot[_2].',['<strong>', '</strong>']),
                localize('If you select "Fall", you win the payout if the [_1]exit spot[_2] is strictly lower than the [_1]entry spot[_2].',['<strong>', '</strong>']),
                localize('If you select "Allow equals", you win the payout if exit spot is higher than or equal to entry spot for "Rise". Similarly, you win the payout if exit spot is lower than or equal to entry spot for "Fall".',['<strong>', '</strong>']),
            ],
        },
        runbet_lucky10: {
            title  : localize('Winning the contract'),
            content: [
                localize('You win the payout if the market price ends in the digit you have selected.',['<strong>', '</strong>']),
            ],
        },
        runbet_quick10: {
            title  : localize('Winning the contract'),
            content: [
                localize('You win the payout if the market price does not end in the digit you have selected.',['<strong>', '</strong>']),
            ],
        },
        runbet_updown: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "rises", you win the payout if the market price is higher than the [_1]entry spot[_2].',['<strong>', '</strong>']),
                localize('If you select "falls", you win the payout if the market price is lower than the [_1]entry spot[_2].',['<strong>', '</strong>']),
            ],
        },
        staysinout: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Stays Between", you win the payout if the market stays between (does not touch) either the [_1]High barrier[_2] or the [_1]Low barrier[_2] at any time during the [_1]contract period[_2].',['<strong>', '</strong>']),
                localize('If you select "Goes Outside", you win the payout if the market touches either the [_1]High barrier[_2] or the [_1]Low barrier[_2] at any time during the [_1]contract period[_2].',['<strong>', '</strong>']),
            ],
        },
        ticks: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Rises", you win the payout if the [_1]exit spot[_2] is strictly higher than the [_1]entry spot[_2].',['<strong>', '</strong>']),
                localize('If you select "Falls", you win the payout if the [_1]exit spot[_2] is strictly lower than the [_1]entry spot[_2].',['<strong>', '</strong>']),
            ],
        },
        touchnotouch: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Touches", you win the payout if the market touches the [_1]barrier[_2] at any time during the [_1]contract period[_2].',['<strong>', '</strong>']),
                localize('If you select "Does Not Touch", you win the payout if the market never touches the [_1]barrier[_2] at any time during the [_1]contract period[_2].',['<strong>', '</strong>']),
            ],
        },
        updown: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "rises", you win the payout if the market price is higher than the entry spot.',['<strong>', '</strong>']),
                localize('If you select "falls", you win the payout if the market price is lower than the entry spot.',['<strong>', '</strong>']),
            ],
        },
        lookbacklow: {
            title  : 'Pay-out',
            content: [
                localize('By purchasing the [_1]"Close-Low"[_2] contract, you\'ll win the multiplier times the difference between the [_1]close[_2] and [_1]low[_2] over the duration of the contract.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        lookbackhigh: {
            title  : 'Pay-out',
            content: [
                localize('By purchasing the [_1]"High-Close"[_2] contract, you\'ll win the multiplier times the difference between the [_1]high[_2] and [_1]close[_2] over the duration of the contract.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        lookbackhighlow: {
            title  : 'Pay-out',
            content: [
                localize('By purchasing the [_1]"High-Low"[_2] contract, you\'ll win the multiplier times the difference between the [_1]high[_2] and [_1]low[_2] over the duration of the contract.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        reset: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select "Reset-Call", you win the payout if the exit spot is strictly higher than either the entry spot or the spot at reset time.',['<strong>', '</strong>']),
                localize('If you select "Reset-Put", you win the payout if the exit spot is strictly lower than either the entry spot or the spot at reset time.',['<strong>', '</strong>']),
                localize('If the [_1]exit spot[_2] is equal to the [_1]barrier[_2] or the <stronm g>new barrier (if a reset occurs)</stronmg>, you don\'t win the payout.',['<strong>', '</strong>']),
            ],
        },
        highlowticks: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select [_1]"High Tick"[_2], you win the payout if the selected tick is the [_1]highest among the next five ticks[_2].', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('If you select [_1]"Low Tick"[_2], you win the payout if the selected tick is the [_1]lowest among the next five ticks[_2].', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        runs: {
            title  : localize('Winning the contract'),
            content: [
                localize('If you select [_1]"Only Ups"[_2], you win the payout if consecutive ticks rise successively after the [_1]entry spot[_2].[_3]No payout if any tick falls or is equal to any of the previous ticks.', '[_1]', '[_2]', '<br />',['<strong>', '</strong>']),
                localize('If you select [_1]"Only Downs"[_2], you win the payout if consecutive ticks fall successively after the [_1]entry spot[_2].[_3]No payout if any tick rises or is equal to any of the previous ticks.', '[_1]', '[_2]', '<br />',['<strong>', '</strong>']),
            ],
        },
    },
    image: {
        explanation_image_1:
      '/images/pages/trade-explanation/en/rises.svg?3e9b01f8f3365272abe03784db97d968',
        explanation_image_2:
      '/images/pages/trade-explanation/en/falls.svg?3e9b01f8f3365272abe03784db97d968',
    },
    explain: {
        asian: {
            title  : localize('Entry Spot'),
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('The Average'),
            content_secondary: [
                localize('The average is the average of the ticks, including the entry spot and the last tick.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        digits: {
            title  : localize('Entry Spot'),
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        endsinout: {
            title  : localize('Exit spot'),
            content: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        evenodd: {
            title  : localize('Entry Spot'),
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        higherlower: {
            title  : localize('Exit spot'),
            content: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        overunder: {
            title  : localize('Entry Spot'),
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        risefall: {
            title  : localize('Entry spot'),
            content: [
                localize('The <strong>start time</strong> is when the contract is processed by our servers and the <strong>entry spot</strong> is the <strong>next tick</strong> thereafter.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('If you select a <strong>start time</strong> in the future, the <strong>start time</strong> is that which is selected and the <strong>entry spot</strong> is the price in effect at that time.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('Exit spot'),
            content_secondary: [
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('If you select a <strong>start time</strong> of "Now", the <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('If you select a specific <strong>end time</strong>, the <strong>end time</strong> is the selected time.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },

        staysinout: {
            title  : localize('Contract period'),
            content: [
                localize('The <strong>contract period</strong> is the period between the <strong>next tick</strong> after the <strong>start time</strong> and the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        touchnotouch: {
            title  : localize('Contract period'),
            content: [
                localize('The <strong>contract period</strong> is the period between the <strong>next tick</strong> after the <strong>start time</strong> and the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong> (if less than one day in duration), or at the end of the trading day (if one day or more in duration).', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        lookbacklow: {
            title  : localize('High, Low and Close'),
            content: [
                localize('The [_1]high[_2] is the highest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]low[_2] is the lowest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]close[_2] is the latest tick at or before the [_1]end time[_2]. If you selected a specific [_1]end time,[_2] the [_1]end time[_2] is the selected time.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('Contract period'),
            content_secondary: [
                localize('The [_1]contract period[_2] is the period between the [_1]first tick[_2] (after start time) and the [_1]end time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]start time[_2] begins when the contract is processed by our servers.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]end time[_2] is the selected number of minutes/hours after the [_1]start time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        lookbackhigh: {
            title  : localize('High, Low and Close'),
            content: [
                localize('The [_1]high[_2] is the highest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]low[_2] is the lowest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]close[_2] is the latest tick at or before the [_1]end time[_2]. If you selected a specific [_1]end time,[_2] the [_1]end time[_2] is the selected time.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('Contract period'),
            content_secondary: [
                localize('The [_1]contract period[_2] is the period between the [_1]first tick[_2] (after start time) and the [_1]end time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]start time[_2] begins when the contract is processed by our servers.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]end time[_2] is the selected number of minutes/hours after the [_1]start time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        lookbackhighlow: {
            title  : localize('High, Low and Close'),
            content: [
                localize('The [_1]high[_2] is the highest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]low[_2] is the lowest point ever reached by the market during the contract period.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]close[_2] is the latest tick at or before the [_1]end time[_2]. If you selected a specific [_1]end time,[_2] the [_1]end time[_2] is the selected time.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('Contract period'),
            content_secondary: [
                localize('The [_1]contract period[_2] is the period between the [_1]first tick[_2] (after start time) and the [_1]end time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]start time[_2] begins when the contract is processed by our servers.', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The [_1]end time[_2] is the selected number of minutes/hours after the [_1]start time[_2].', '<strong>','</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        reset: {
            title  : localize('Reset Time'),
            content: [
                localize('At reset time, if the spot is in the opposite direction of your prediction, the barrier is reset to that spot.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>exit spot</strong> is the latest tick at or before the <strong>end time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>end time</strong> is the selected number of minutes/hours after the <strong>start time</strong>.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>start time</strong> is when the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
                localize('The <strong>entry spot</strong> is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        highlowticks: {
            title  : localize('Entry Spot'),
            content: [
                localize('The entry spot is the first tick after the contract is processed by our servers.', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
        runs: {
            title  : localize('Entry spot'),
            content: [
                localize('The [_1]start time[_2] is when the contract has been processed by our servers and the [_1]entry spot[_2] is the [_1]next tick[_2] thereafter.', '<strong>', '</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
            title_secondary  : localize('Exit Spot'),
            content_secondary: [
                localize('The [_1]exit spot[_2] is the last tick when the contract ends. Contract ends when all ticks rise or fall successively, or when a single tick breaks the predicted pattern.', '<strong>', '</strong>', '[_1]', '[_2]',['<strong>', '</strong>']),
            ],
        },
    },
    note: {
        asian: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Asian contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.',['<strong>', '</strong>']),
            ],
        },
        digits: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Digit contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.',['<strong>', '</strong>']),
            ],
        },
        endsinout: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Ends Between/Ends Outside contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.',['<strong>', '</strong>']),
            ],
        },
        evenodd: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Even/Odd contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.',['<strong>', '</strong>']),
            ],
        },
        higherlower: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Higher/Lower contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.',['<strong>', '</strong>']),
            ],
        },
        overunder: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Over/Under contracts will be refunded at the purchase price if the contract doesn\'t end within 5 minutes.', ['<strong>', '</strong>']),
            ],
        },
        risefall: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Rise/Fall contracts will be refunded if:',['<strong>', '</strong>']) ,
                localize(' • There are less than 2 ticks between the start and end times'),
                localize(' • The contract doesn\'t end within 5 minutes (for tick duration contracts'),
        
            ],
        },
        staysinout: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Stays Between/Goes Outside Contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.',['<strong>', '</strong>']),
            ],
        },
        touchnotouch: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: Touch/No Touch contracts will be refunded at the purchase price if there are less than 2 ticks between the start and end times.',['<strong>', '</strong>']),
            ],
        },
        highlowticks: {
            title  : 'Note',
            content: [
                localize('[_1]Note[_2]: High Tick/Low Tick contracts have a strict duration of five ticks.',['<strong>', '</strong>']),
            ],
        },
    },
};
