const fs = require('fs')
const path = require('path')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')))
const env = process.env.NODE_ENV || 'development';
console.log(`load config: [defult, ${env}]`);
module.exports = Object.assign(config.default || {}, config[env])