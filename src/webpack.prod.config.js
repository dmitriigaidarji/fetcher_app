var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./compiled/bundles/prod/')
config.output.publicPath = '/static/bundles/prod/'



config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),

    // removes a lot of debugging code in React
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'BASE_API_URL': JSON.stringify('https://dimag.co/fetcher/api/'),
            'PUBLIC_URL': JSON.stringify('/')
        }
    }),

    // keeps hashes consistent between compilations
    new webpack.optimize.OccurrenceOrderPlugin(),

    // minifies your code
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    })
])

// Add a loader for JSX files
config.module.loaders.push(
    {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']}
)

module.exports = config