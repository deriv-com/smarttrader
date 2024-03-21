module.exports = function (grunt) {
    return {
        options: {
            processors: [
                require('autoprefixer')()
            ],
        },
        dist: {
            src: `${global.dist}/css/{app,common,static}.css`,
        },
    };
};
