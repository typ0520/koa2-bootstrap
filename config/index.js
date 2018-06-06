const defaultConfig = require('./default.js');
const devConfig = require('./development.js');
const prodConfig = require('./production.js');

const env = process.env.NODE_ENV;
console.log(`NODE_ENV: ${env}`);

let config = defaultConfig;

if (env === 'development') {
    config = Object.assign(config, devConfig);
} if (env === 'production') {
    config = Object.assign(config, devConfig);
}
module.exports = config;