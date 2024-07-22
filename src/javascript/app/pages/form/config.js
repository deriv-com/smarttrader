const allDurationUnits = ['ticks','seconds','minutes','hours','days'];
const noSecondsUnits = allDurationUnits.filter((v) => v !== 'seconds');
const noDaysUnits = allDurationUnits.filter((v) => v !== 'days');
const highDurationUnits = noSecondsUnits.filter((v) => v !== 'ticks');
const onlyTicksUnits  = [...allDurationUnits[0]];
const onlyMinutesUnits  = [...allDurationUnits[2]];

export const config = {
    'risefall': {
        inputs: [
            {
                type: 'start_time',
            },
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 1,
                    }],
                units: allDurationUnits,
            },
            {
                type: 'amount_type',
            },
        ],
        has_allow_equals: true,
    },
    'touchnotouch': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 2,
                    }],
                units: noSecondsUnits,
            },
            {
                type: 'barrier_offset',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'higherlower': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 1,
                    }],
                units: allDurationUnits,
            },
            {
                type: 'barrier_offset',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'endsinout': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 2,
                    }],
                units: highDurationUnits,
            },
            {
                type: 'high_barrier_offset',
            },
            {
                type: 'low_barrier_offset',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'asian': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 5,
                    }],
                units: onlyTicksUnits,
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'staysinout': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 2,
                    }],
                units: highDurationUnits,
            },
            {
                type: 'high_barrier_offset',
            },
            {
                type: 'low_barrier_offset',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'matchdiff': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'ticks',
                        value: 1,
                    }],
                units: onlyTicksUnits,
            },
            {
                type: 'last_digit_prediction',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'evenodd': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'ticks',
                        value: 1,
                    }],
                units: onlyTicksUnits,
            },
            {
                type: 'last_digit_prediction',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'overunder': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'ticks',
                        value: 1,
                    }],
                units: onlyTicksUnits,
            },
            {
                type: 'last_digit_prediction',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'lookbackhigh': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 1,
                    }],
                units: onlyMinutesUnits,
            },
            {
                type: 'multiplier',
            },
        ],
    },
    'lookbacklow': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 1,
                    }],
                units: onlyMinutesUnits,
            },
            {
                type: 'multiplier',
            },
        ],
    },
    'lookbackhighlow': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration','endtime'],
                minimum: [
                    {
                        name : 'minutes',
                        value: 1,
                    }],
                units: onlyMinutesUnits,
            },
            {
                type: 'multiplier',
            },
        ],
    },
    'reset': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'ticks',
                        value: 5,
                    },
                    {
                        name : 'seconds',
                        value: 20,
                    },
                    {
                        name : 'minutes',
                        value: 1,
                    },
                    {
                        name : 'hours',
                        value: 1,
                    },
                ],
                units: noDaysUnits,
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'highlowticks': {
        inputs: [
            {
                type         : 'fixed_duration',
                duration_type: '5ticks',
            },
            {
                type: 'tick_prediction',
            },
            {
                type: 'amount_type',
            },
        ],
    },
    'runs': {
        inputs: [
            {
                type   : 'expiry_type',
                options: ['duration'],
                minimum: [
                    {
                        name : 'ticks',
                        value: 2,
                    },
                ],
                units: onlyTicksUnits,
            },
            {
                type: 'amount_type',
            },
        ],
    },
};
