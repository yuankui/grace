const rewireYAML = require('react-app-rewire-yaml');
const custom = require('./webpack/custom');

module.exports = function override(config, env) {
    // support yaml load
    config = rewireYAML(config, env);

    // support multi entry
    config = custom(config, env);

    return config;
};
