module.exports.webpackConfig = {
    devtool: 'cheap-eval-source-map',

    target: 'node',

    resolve: {
        modules: ['node_modules']
    },

    entry: [],

    output: {
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },

        ]
    },

    plugins: []
};
