const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: 'eslint-loader' },
            { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
            { test: /\.less$/, use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                { loader: 'less-loader' }
            ]}
        ]
    },
    watch: true,
    devServer: {
        port: 9090,
        open: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Pizzeria Uno', template: './index.html', inject: 'body' })
    ]
};
