const path = require('path');
const ExtractTextPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const mini = require('optimize-css-assets-webpack-plugin');
module.exports = {
    entry: './assets/js/app.js',
    output: {
      filename: 'js/app.js',
      path: path.resolve(__dirname, 'public')
    },
    module:{
        rules:[
            {
                test: /\.s?[ac]ss$/, 
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new ExtractTextPlugin({
            filename: "css/app.big.css"
        }),
        new mini({
            assetNameRegExp: /\.optimize\.sass$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
    ],
    mode: 'production'
};