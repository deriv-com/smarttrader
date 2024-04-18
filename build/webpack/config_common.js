const TerserPlugin = require('terser-webpack-plugin');
const PostCssCacheBuster = require('postcss-cachebuster');
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
                test         : /\.min\.js$/,
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
                        loader : '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    { removeTitle: false },
                                ],
                                floatPrecision: 2,
                            },
                        },
                    },
                ],
            },
            {
                test   : /\.css?$/,
                exclude: /node_modules/,
                loader : 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins  : () => [
                        PostCssCacheBuster({
                            imagesPath    : '/src/images',
                            cssPath       : '/dist/css',
                            supportedProps: [
                                'background',
                                'background-image',
                            ],
                            paramName: 'v=',
                        }),
                    ],
                },
            },
        ],
    },
    watch       : false,
    watchOptions: {
        ignored: /node_modules/,
    },
});

module.exports = commonConfig;
