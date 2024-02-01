module.exports = {
    all: {
        options: {
            reporter         : 'spec',
            quiet            : false, // Optionally suppress output to standard out (defaults to false)
            clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
            require: [
                'babel-register',
                'babel-polyfill',
                'jsdom-global/register',
                'mock-local-storage',
            ],
        },
        spec: [
            'src/javascript/**/__tests__/*.js',
            'scripts/__tests__/*.js',
        ],
    },
};


// NODE_ENV=test ./node_modules/mocha/bin/mocha '*/**/__tests__/**/*.js' --reporter spec --exclude 'node_modules/**/*