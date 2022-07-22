"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const session = require('express-session')
// const connectRedis = require('connect-redis')
const redis_1 = __importDefault(require("redis"));
const tslog_1 = require("tslog");
// redis setting
const port = 6379;
const host = 'localhost';
const password = 'changeme';
const redisClient = redis_1.default.createClient(port, host);
redisClient.auth(password);
const log = new tslog_1.Logger({ name: '딜리버블 백엔드 짱짱' });
redisClient.on('connect', function () {
    log.info('Redis plugged in.');
});
module.exports = redisClient;
//# sourceMappingURL=redis.js.map