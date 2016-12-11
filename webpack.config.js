module.exports = {
    entry: './blocks/app/app.js',
    output: {
        path: "./public/",
        filename: "app.js"
    },
    
    devtool: 'inline-source-map',

    module: {

        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]

    }

};
