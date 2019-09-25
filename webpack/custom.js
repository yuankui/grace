const merge = require('webpack-merge');

const config = {
    output: {
        publicPath: ''
    }
};


module.exports = function (c, entry) {
    return merge(c, config);
};