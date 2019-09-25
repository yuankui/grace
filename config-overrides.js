const rewireYAML = require('react-app-rewire-yaml');
const multiEntry = require('./webpack/multi_entry');

module.exports = function override(config, env) {
    // support yaml load
    config = rewireYAML(config, env);

    // support multi entry
    config = multiEntry(config, env);
    return config;
};
