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
import { insertScriptData } from './util/insertScript';
import {errorHandler} from './error/ErrorHandler';
import redis from "redis";
import {Logger} from "tslog";
const cors = require('cors');

// redis setting
const port = 6379;
const host = "localhost";
const password = "changeme";
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

const app = express();


// CORS 미들웨어 사용
// app.use(
//   cors()
//  );
const allowlist = ['http://localhost:8080'];
app.use(cors({
  credentials: true,
  // origin: ["http://localhost:8080", "http://13.209.32.166:8080"], 
  origin: "http://localhost:8080", 
  methods: 'GET, POST, OPTIONS',
  preflightContinue: true,
  })
);

// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 폴더로 분기
app.use(routes);
app.use(errorHandler);



const log: Logger = new Logger({ name: "딜리버블 백엔드 짱짱" });

createConnection().then(async (connection) => {
  // await insertScriptData(connection);
  // const user = await MockUserToFavorite(connection);
  await insertNewsData(connection);

  app.listen(8080, () => {
    log.info('Server is running on port 8080');
  });
});
