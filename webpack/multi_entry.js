const merge = require('webpack-merge');

const config = {
    entry: {
        index: './src/index.js',
    }
};


module.exports = function (c, entry) {
    return merge(c, config);
};