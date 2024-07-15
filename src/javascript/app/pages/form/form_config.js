
const ExpiryType = {
    options: [
        { text: 'Duration', value: 'duration' },
        { text: 'End Time', value: 'endtime' },
    ],
    defaultValue: 'duration',
    duration    : [
        {
            id       : 'duration_amount',
            component: 'TextField',
            props    : {
                type   : 'number',
                value  : '15',
                message: 'Minimum: 15',
            },
        },
        {
            id       : 'duration_units',
            component: 'InputDropdown',
            props    : {
                options: [
                    {
                        text : 'minutes',
                        value: 'minutes',
                    },
                    {
                        text : 'hours',
                        value: 'hours',
                    },
                    {
                        text : 'days',
                        value: 'days',
                    },
                ],
                value: 'days',
            },
        },
    ],
    endtime: [
        {
            id       : 'expiry_type_endtime',
            component: 'DatePickerDropdown',
            props    : {
                type   : 'number',
                value  : '15',
                message: 'Minimum: 15',
            },
        },
    ],
};

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

export const formConfig = {
    risefall: {
        startTime: {
            label  : 'Start Time',
            options: [
                { text: 'Now', value: 'now' },
                { text: 'Today', value: 'today' },
                { text: 'Tomorrow', value: 'tomorrow' },
            ],
            defaultValue: 'now',
        },
        expiryType : ExpiryType,
        payoutType : PayoutType,
        allowEquals: true,
    },
    touchnotouch: {
        expiryType: ExpiryType,
        barrier   : Barrier,
        payoutType: PayoutType,
    },
    higherlower: {
        expiryType: ExpiryType,
        barrier   : Barrier,
        payoutType: PayoutType,
    },
    endsinout: {
        expiryType    : ExpiryType,
        highlowBarrier: HighLowBarrier,
        payoutType    : PayoutType,
    },
    staysinout: {
        expiryType    : ExpiryType,
        highlowBarrier: HighLowBarrier,
        payoutType    : PayoutType,
    },
    matchdiff: {
        expiryType: ExpiryType,
        lastDigit : LastDigitPrediction,
        payoutType: PayoutType,
    },
    evenodd: {
        expiryType: ExpiryType,
        payoutType: PayoutType,
    },
    overunder: {
        expiryType: ExpiryType,
        lastDigit : LastDigitPrediction,
        payoutType: PayoutType,
    },
    asian: {
        expiryType: ExpiryType,
        payoutType: PayoutType,
    },
};

export default formConfig;
