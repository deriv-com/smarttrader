const webpackMerge   = require('webpack-merge');
const appConfig      = require('./webpack/config_app');
const commonConfig   = require('./webpack/config_common');

module.exports = function (grunt) {
    const section = [webpackMerge.smart(commonConfig(grunt), appConfig(grunt))];

    const watch_config = {
        watch: true,
        optimization: {
            minimize: false,
        },
    };

    return {
        section,
        watch: section.map(conf => webpackMerge(conf, watch_config)),
    };
};
