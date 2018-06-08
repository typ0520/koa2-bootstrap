const fs = require('fs')
const path = require('path')
const env = process.env.NODE_ENV || 'development';

const config = {
    default: {
        port: 8080
    },
    development: {
        secret: 'sdsdsfdegfdsgdssd'
    },
    test: {},
    production: {}
}

console.log(`load config: [defult, ${env}]`);
module.exports = Object.assign(config.default, config[env])