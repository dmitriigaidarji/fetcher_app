var path = require("path")
var webpack = require('webpack')
module.exports = {
    context: __dirname,

    entry: {
        // Add as many entry points as you have container-react-components here
        FetcherApp: './web/fetcher_app/Index',
        vendors: ['react']
    },

    output: {
        path: path.resolve('./compiled/bundles/local/'),
        filename: "[name]-[hash].js",
        // publicPath: '/static/'
    },

    externals: [], // add all vendor libs

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors-[hash].js'}),
    ], // add all common plugins here

    module: {
        loaders: [
            // {
            //     test: /\.scss/,
            //     exclude: /node_modules/,
            //     loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap&includePaths[]=node_modules/compass-mixins/lib'
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                }],
                exclude: /node_modules/
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },
};
// module.rules = [
//     {
//       test: /\.js$/,
//       exclude: /(node_modules|bower_components)/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: ['env'],
//           plugins: [require('babel-plugin-transform-object-rest-spread')]
//         }
//       }
//     }
//   ];