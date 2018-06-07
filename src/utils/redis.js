/**
const redis = require('../src/utils/redis')

const ticketExpireInSecond = 60 * 60 / 2 * 0.9
redis.setex('redisKey', ticketExpireInSecond, '哈哈')
//单位是秒
redis.setex('redisKey2',20, '哈哈2')

async function test_get() {
    const value1 = await redis.getAsync('redisKey')
    const value2 = await redis.getAsync('redisKey2')
    console.log('value1 ', value1)
    console.log('value2 ', value2)
}
test_get()
 */

const logger = require('./logger')
const config = require('../../config')
const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient(config.redis)

const methods = ['hgetall', 'duplicate', 'get']
methods.forEach(originMethodName => {
  const asyncMethodName = originMethodName + 'Async'
  const asyncMethod = promisify(client[originMethodName]).bind(client)
  Object.defineProperty(client, asyncMethodName, { value: asyncMethod })
})

client.on('ready', () => {
  logger.info('redis ready')
})

client.on('error', (err) => {
  if (err) {
    logger.error('redis error:', err)
  }
})

process.on('SIGINT', () => {
  logger.info('received SIGINT, closing redis connection...')
  client.quit(() => {
    logger.info('closed redis connection, exiting process...')
    process.exit(0)
  })
})

module.exports = client
