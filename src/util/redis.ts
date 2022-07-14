// const session = require('express-session')
// const connectRedis = require('connect-redis')
import redis from "redis";

// redis setting
const port = 6379;
const host = "localhost";
const password = "changeme";
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

redisClient.on("connect", function () {
    console.log("Redis plugged in.");
});

module.exports = redisClient;
