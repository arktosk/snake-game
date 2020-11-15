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
                test: /\.ts$/i,
                loader: "ts-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      encoding: 'base64',
                    },
                  },
                ],
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
