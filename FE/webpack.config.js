var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: [
        './src/app.tsx'
    ],
    output: {
        path: __dirname + '/site',
        publicPath: '',
        filename: 'app.js'
    },
    target: 'web',
    module: {
        loaders: [
            {
                test: /\.(woff|svg|ttf|eot|gif|jpeg|jpg|png)([\?]?.*)$/,
                include: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "res"),
                ],
                loader: "file-loader",
                query: {
                    name: "[path][name].[ext]",
                },
            },
            {test: /\.tsx?/, loader: 'ts-loader'},
            {test: /\.less$/, loader: "style!css!less"}
        ]
    },
    resolve: {
        extensions: ["", ".js", ".ts", ".tsx"],
        moduleDirectories: ['src', 'node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'US Substantial Presence',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ]
};