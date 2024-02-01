const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const StylelintPlugin = require('stylelint-webpack-plugin')
const StylelintFormatter = require('stylelint-formatter-pretty')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const ESLintWebpackPlugin = require('eslint-webpack-plugin');
// const glob  = require('glob');
// const globImporter = require('node-sass-glob-importer');

const node_modules_paths = {
  binary_style: 'node_modules/@binary-com/binary-style',
  deriv_p2p: 'node_modules/@deriv/p2p',
}

module.exports = (env, argv) => {
  // const isRelease = argv.mode === 'production';
  const distFolder = path.resolve(__dirname, 'dist')
  const config = {
    mode: 'development',
    entry: ['./src/javascript/index.js',
    './src/sass/main.scss'
    ],
    stats: {
      errorDetails: true,
    },
    // devServer: {
    //   publicPath: path.resolve(__dirname, 'dist'),
    //   disableHostCheck: true,
    //   clientLogLevel: 'info',
    //   open: true,
    //   compress:true,
    //   host: 'localhost',
    //   https: true,
    //   port: 8090,
    //   historyApiFallback: true,
    // },
    target: 'web',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/vendors.[contenthash].js',
      chunkFilename: 'js/[name]-[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    watch: true,
    // devtool: 'source-map',
    resolve: {
      extensions: ['.css', '.scss', '.js', '.jsx'],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.js$/,
          include: /__tests__/,
          use: 'mocha-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-1', 'react'],
            plugins: [
              'transform-decorators-legacy',
              'transform-object-rest-spread',
              'transform-class-properties',
              'babel-plugin-syntax-dynamic-import',
              'babel-plugin-transform-es2015-modules-commonjs',
              'babel-plugin-transform-object-rest-spread',
              'babel-plugin-transform-react-jsx',
            ],
          },
        },
      ],
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildEnd: {
          scripts: ['node scripts/render.js'],
          blocking: false,
          parallel: true,
        },
      }),
      new StylelintPlugin({
        formatter: StylelintFormatter,
        configFile: path.resolve(__dirname, '.stylelintrc.js'),
        context: path.resolve(__dirname, 'src/sass'),
        files: ['src/sass/**/*.scss', '!src/sass/**/external/**/*.scss'],
        fix: true,
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /ja/),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].css',
        ignoreOrder: true,
      }),
      new HtmlWebpackPlugin({
        template: './src/root_files/app/index.html',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: './src/reports/report.html',
        openAnalyzer: false,
      }),
      new CopyPlugin({
        patterns: [
          // Top level (dist)
          { from: 'src/root_files/_common', to: distFolder },
          {
            from: 'src/images/common/logos',
            to: `${distFolder}/images/common/logos/`,
          },
          {
            from: 'src/download/fonts/binary_symbols.woff',
            to: `${distFolder}/download/fonts/`,
          },
          { from: 'favicon.ico', to: distFolder },

          // Serve pushwoosh SDKs
          { from: 'src/javascript/_common/lib/pushwooshSDK/', to: distFolder },
          // app, static
          { from: 'src/download/', to: `${distFolder}/download/` },
          {
            from: 'src/images/',
            to: `${distFolder}/images/`,
            filter: (pth) => !pth.includes('common/logos'),
          },
          {
            from: 'src/javascript/_autogenerated',
            to: `${distFolder}/js/texts`,
          },
          { from: 'src/javascript/manifest.json', to: distFolder },
          {
            from: 'src/javascript/landing_pages',
            to: `${distFolder}/js/landing_pages`,
            noErrorOnMissing: true,
          },
          {
            from: 'src/javascript/_common',
            to: `${distFolder}/js/_common`,
            noErrorOnMissing: true,
          },
          {
            from: `${node_modules_paths.binary_style}/binary.css`,
            to: `${distFolder}/css/common.css`,
          },
          {
            from: `${node_modules_paths.deriv_p2p}/lib/*.css`,
            to: `${distFolder}/css/p2p.css`,
          },

          // binary-style
          {
            from: path.join(
              node_modules_paths.binary_style,
              'src/images/favicons'
            ),
            to: `${distFolder}/images/favicons/`,
          },
          {
            from: path.join(node_modules_paths.binary_style, 'src/images/logo'),
            to: `${distFolder}/images/logo/`,
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
  }

  config.plugins.push(
    new WebpackPluginServe({
      host: '127.0.0.1',
      port: 8090,
      static: path.resolve(__dirname,'dist'),
      open: true,
      status:true,
      compress:true,
      hmr: true,
      liveReload:true,
      progress: false,
    })
  )
  return config
}
