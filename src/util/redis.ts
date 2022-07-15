// const session = require('express-session')
// const connectRedis = require('connect-redis')
import redis from 'redis';
import { Logger } from 'tslog';

// redis setting
const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

redisClient.on('connect', function () {
  log.info('Redis plugged in.');
});

module.exports = redisClient;
