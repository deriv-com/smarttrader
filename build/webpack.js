const path           = require('path');
const webpack        = require('webpack');
const { merge }      = require('webpack-merge');
const appConfig      = require('./webpack/config_app');
const commonConfig   = require('./webpack/config_common');
const PATHS          = require('./webpack/paths');
const getPlugins     = require('./webpack/plugins');

module.exports = function (grunt) {
    const section = [merge(commonConfig(grunt), appConfig(grunt))];

    const watch_config = {
        watch: true,
        optimization: {
            minimize: false,
        },
    };

    return {
        section,
        watch: section.map(conf => merge(conf, watch_config)),
    };
};
