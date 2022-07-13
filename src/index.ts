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

const app = express();

// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 폴더로 분기
app.use(routes);

createConnection().then(async (connection) => {
  // await insertNewsData(connection);
  app.listen(8080, () => {
    console.log('server is listening 8080');
  });
});
