var path = require('path');

module.exports = {
    entry: path.resolve("./blocks/app/app.js"),
    output: {
        path: "./public/",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }

        ]
    },
    watch: true
};