let defaultconfig = require('./default.json');
let developmentconfig = require('./development.json')
let stagingconfig = require('./staging.json');
let productionconfig = require('./production.json');
const packagejson = require('../package.json');
const node_env = packagejson.NODE_ENV || 'default';
let config = developmentconfig;

if (node_env) {
    if (node_env == 'default') {
       config = defaultconfig;
    } else if (node_env == 'development') {
        config = developmentconfig;
    } else if (node_env == 'production') {
        config = productionconfig;
    } else if (node_env == 'staging') {
        config = stagingconfig;
    }
}

module.exports = config;
