const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        'app': './app.js'

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devtool: 'cheap-module-eval-source-map'
}