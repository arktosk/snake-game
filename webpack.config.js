const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => ({
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'hidden-source-map' : 'eval',
    entry: ["./src/main.css", "./src/index.ts"],
    output: {
        filename: "[name].js?[fullhash]",
    },
    devServer: {
        hot: true,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "The Snake",
        }),
    ],
});
