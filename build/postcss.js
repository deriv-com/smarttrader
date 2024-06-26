module.exports = function (grunt) {
    return {
        options: {
            processors: [
                require('autoprefixer')(),
                require('postcss-cachebuster')({
                    supportedProps: [
                        'background',
                        'background-image',
                    ],
                }),
            ],
        },
        dist: {
            src: `${global.dist}/css/{app,common,static,reset}.css`,
        },
    };
};
