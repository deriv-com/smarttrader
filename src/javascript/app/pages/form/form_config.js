
const PayoutType = [
    {
        id       : 'payout_type',
        component: 'InputDropdown',
        props    : {
            options: [
                { text: 'Stake', value: 'stake' },
                { text: 'Payout', value: 'payout' },
            ],
            value: 'stake',
        },
    },
    {
        id       : 'payout_amount',
        component: 'TextFieldAddon',
        props    : {
            addonLabel   : 'USD',
            addOnPosition: 'right',
            value        : '10',
        },
    },
];

const Barrier = {
    id   : 'barrier',
    props: {
        label: 'Barrier',
        type : 'number',
        value: '2318.13',
    },
};

const HighLowBarrier = [
    {
        id   : 'barrier_high',
        props: {
            label: 'High barrier',
            type : 'number',
            value: '18391',
        },
    },
    {
        id   : 'barrier_low',
        props: {
            label: 'Low barrier',
            type : 'number',
            value: '17592',
        },
    },
];

const LastDigitPrediction = {
    label  : 'Last Digit Prediction',
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    value  : '0',
};

const TickPrediction = {
    label  : 'Tick Prediction',
    options: ['1', '2', '3', '4', '5'],
    value  : '1',
};

export const formConfig = {
    risefall: {
        startTime: {
            label: 'Start Time',
        },
        payoutType : PayoutType,
        allowEquals: true,
    },
    callputequal: {
        payoutType : PayoutType,
        allowEquals: true,
    },
    touchnotouch: {
        barrier   : Barrier,
        payoutType: PayoutType,
    },
    higherlower: {
        barrier   : Barrier,
        payoutType: PayoutType,
    },
    endsinout: {
        highlowBarrier: HighLowBarrier,
        payoutType    : PayoutType,
    },
    staysinout: {
        highlowBarrier: HighLowBarrier,
        payoutType    : PayoutType,
    },
    matchdiff: {
        lastDigit : LastDigitPrediction,
        payoutType: PayoutType,
    },
    evenodd: {
        payoutType: PayoutType,
    },
    overunder: {
        lastDigit : LastDigitPrediction,
        payoutType: PayoutType,
    },
    asian: {
        payoutType: PayoutType,
    },
    lookbackhigh: {
    },
    lookbacklow: {
    },
    lookbackhighlow: {
    },
    reset: {
        infoMessage: 'The reset time is 30 seconds',
        payoutType : PayoutType,
    },
    highlowticks: {
        infoMessage   : 'This contract type only offers 5 ticks',
        tickPrediction: TickPrediction,
        payoutType    : PayoutType,
    },
    runs: {
        payoutType: PayoutType,
    },
};

export default formConfig;
