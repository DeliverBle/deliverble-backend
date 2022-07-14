import express from 'express';
import { createConnection } from 'typeorm';
import { News } from './entity/News';
import { NewsInfo } from './types';
import { Category } from './shared/common/Category';
import { Gender } from './shared/common/Gender';
import { Time } from './vo/Time';
import { Suitability } from './shared/common/Suitability';
import { Tag } from './entity/Tag';
import routes from './routes';
import { Channel } from './shared/common/Channel';
import { insertNewsData } from './util/insertNews';
import { MockUserToFavorite } from './util/MockUserToFavorite';
import errorHandler from './error/ErrorHandler';
const session = require('express-session')
const connectRedis = require('connect-redis')
import redis from "redis";

// redis setting
const port = 6379;
const host = "localhost";
const password = "changeme";
const redisClient = redis.createClient(port, host);
redisClient.auth(password);
const RedisStore = connectRedis(session);

const app = express();

// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// redis session
app.use(
    session({
      secret: password,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
        host: process.env.RedisHost,
        port: process.env.RedisPort,
        pass: process.env.RedisPassword,
        logErrors: true
      })
    })
);

// routes 폴더로 분기
app.use(routes);
app.use(errorHandler);

createConnection().then(async (connection) => {
  // await insertNewsData(connection);
  // const user = await MockUserToFavorite(connection);

  app.listen(8080, () => {
    console.log('server is listening 8080');
  });
});
