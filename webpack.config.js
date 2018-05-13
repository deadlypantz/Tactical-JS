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
                test: /\.scss$/, 
                use: [
                    ExtractTextPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new ExtractTextPlugin({
            filename: "css/app.css"
        }),
        new mini({}),
    ],
    mode: 'production'
};