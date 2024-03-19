const TerserPlugin = require('terser-webpack-plugin');
const publicPathFactory = require('./helpers').publicPathFactory;

const commonConfig = (grunt) => ({
    devtool: false, // handled by SourceMapDevToolPlugin
    mode   : global.is_release ? 'production' : 'development',
    stats  : {
        chunks  : false,
        warnings: false,
    },
    output: {
        filename     : '[name].js',
        chunkFilename: '[name].min.js',
        publicPath   : publicPathFactory(grunt),
    },
    optimization: {
        chunkIds : 'named',
        minimize : true,
        minimizer: [
            new TerserPlugin({
                test         : /\.min\.js/,
                exclude      : /vendors~/,
                parallel     : true,
                terserOptions: {
                    sourceMap: true,
                },
            }),
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test   : /\.jsx?$/,
                exclude: /node_modules/,
                loader : 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'babel-plugin-syntax-dynamic-import',
                    ],
                },
            },
            {
                test: /\.svg$/,
                use : [
                    'babel-loader',
                    {
                        loader : 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    { removeTitle: false },
                                ],
                                floatPrecision: 2,
                            },
                        },
                    },
                ],
            },
        ],
    },
    watch       : false,
    watchOptions: {
        ignored: /node_modules/,
    },
});

module.exports = commonConfig;
