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
        expiryType: {
            options: [
                { text: 'Duration', value: 'duration' },
                { text: 'End Time', value: 'endtime' },
            ],
            defaultValue: 'duration',
        },
        payoutType: PayoutType,
    },
    touchnotouch: {
        expiryType: {
            options: [
                { text: 'Duration', value: 'duration' },
                { text: 'End Time', value: 'endtime' },
            ],
            defaultValue: 'duration',
        },
        barrier: {
            type : 'barrier',
            props: {
                label: 'Barrier',
                type : 'number',
                value: '2318.13',
            },
        },
        payoutType: PayoutType,
    },
};

export default formConfig;
