const CircularDependencyPlugin = require('circular-dependency-plugin');
const CryptoJS   = require('crypto-js');
const path                     = require('path');
const webpack                  = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PATHS                    = require('./paths');

class WatchRunPlugin {
    constructor(grunt) {
        this.grunt = grunt;
    }

    apply(compiler) {
        compiler.hooks.watchRun.tap('WatchRunPlugin', (comp) => {
            // eslint-disable-next-line no-console
            console.log('\n');
            this.grunt.log.ok('Build started at:', new Date().toString().grey);
    
            if (comp.modifiedFiles) {
                const changed_files = Array.from(comp.modifiedFiles);
    
                this.grunt.log.ok(`Changed file${changed_files.length > 1 ? 's' : ''}:`);
    
                changed_files.forEach((file) => {
                    const file_path = file.replace(process.cwd(), '.').match(/(.*\/)(.*(?!\/))$/);
                    if (file_path) {
                        this.grunt.log.write('   -'.green, file_path[1].grey, `\b${file_path[2]}\n`);
                    }
                });
            }
        });
    }
}

const getPlugins = (app, grunt) => ([
    new CircularDependencyPlugin({
        failOnError: true,
    }),

    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        test    : /binary/,
    }),

    new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /ja/),

    ...(global.is_release
        ? [
            new webpack.DefinePlugin({
                '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })',
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    BUILD_HASH: JSON.stringify(CryptoJS.MD5(Date.now().toString()).toString()),
                    NODE_ENV  : JSON.stringify('production'),
                },
            }),
        ]
        : [
            new WatchRunPlugin(grunt),
            ...(!grunt.option('analyze') ? [] : [
                new BundleAnalyzerPlugin({
                    analyzerMode  : 'static',
                    reportFilename: path.resolve(PATHS.ROOT, `../report_${app}.html`),
                    openAnalyzer  : false,
                }),
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    BUILD_HASH: JSON.stringify(CryptoJS.MD5(Date.now().toString()).toString()),
                },
            }),
        ]
    ),
]);

module.exports = getPlugins;
