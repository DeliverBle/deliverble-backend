import express from 'express';
import { createConnection } from 'typeorm';
import routes from './routes';
import {errorHandler} from './error/ErrorHandler';
import redis from "redis";
import {Logger} from "tslog";

// redis setting
const port = 6379;
const host = "localhost";
const password = "changeme";
const redisClient = redis.createClient(port, host);
redisClient.auth(password);

const app = express();

// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 폴더로 분기
app.use(routes);
app.use(errorHandler);

const log: Logger = new Logger({ name: "딜리버블 백엔드 짱짱" });

createConnection().then(async (connection) => {
  // await insertNewsData(connection);
  // const user = await MockUserToFavorite(connection);

  app.listen(8080, () => {
    log.info('Server is running on port 8080');
  });
});
