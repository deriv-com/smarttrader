
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
        type     : 'payout_type',
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
        type     : 'payout_amount',
        component: 'TextFieldAddon',
        props    : {
            addonLabel   : 'USD',
            addOnPosition: 'right',
            value        : '10',
        },
    },
];

const Barrier = {
    type : 'barrier',
    props: {
        label: 'Barrier',
        type : 'number',
        value: '2318.13',
    },
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
        expiryType: ExpiryType,
        payoutType: PayoutType,
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
};

export default formConfig;
