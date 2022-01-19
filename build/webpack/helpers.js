const makeCacheGroup = (name, priority, ...matches) => ({
    [name]: {
        name,
        priority,
        chunks  : 'initial',
        enforce : true,
        filename: '[name].min.js',
        test    : new RegExp(`^${matches.map(m => `(?=.*${m})`).join('')}`),
    },
});

const publicPathFactory = () => () => (
    `${global.branch ? `/binary-static/${global.branch_prefix}${global.branch}` : ''}/js/`
);

module.exports = {
    makeCacheGroup,
    publicPathFactory,
};
