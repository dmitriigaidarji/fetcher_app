var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var config = require('./webpack.base.config.js')

var ip = '0.0.0.0'

config.devtool = "#eval-source-map"

config.devServer = {
    contentBase: 'compiled/bundles/local',
    hot: true
};


config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new BundleTracker({filename: './webpack-stats-local.json'}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'BASE_API_URL': JSON.stringify('http://' + ip + ':8000/fetcher/api/'),
            'SERVER': JSON.stringify('http://' + ip + ':3000/'),
            'PUBLIC_URL': JSON.stringify('/')
        }
    }),
]);

config.module.loaders.push(
    {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']}
);

config.entry = {
    FetcherApp: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://' + ip + ':3000',
        'webpack/hot/only-dev-server',
        './web/fetcher_app/Index'
    ]
};

// config.output.publicPath = '/';

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/';

module.exports = config;