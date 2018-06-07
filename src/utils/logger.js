const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

const logger = new (winston.Logger)({
  emitErrs: false,
  level: env === 'development' ? 'debug' : 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true
    })
  ]
});

module.exports = logger;
