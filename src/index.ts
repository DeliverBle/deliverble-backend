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

const app = express();

// Request body를 parsing 하기 위한 미들웨어 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes 폴더로 분기
app.use(routes);

// news 생성하고 포트 열기
let jeongbuTag1 = new Tag();
jeongbuTag1.name = '정부';
let gamyeomTag2 = new Tag();
gamyeomTag2.name = '감염증';

// createConnection().then(async (connection) => {
//   const newsRepository = News.getRepository();
//   const tagRepository = Tag.getRepository();
//   let tag1 = tagRepository.create(jeongbuTag1);
//   let tag2 = tagRepository.create(gamyeomTag2);
//   tagRepository.save(tag1);
//   tagRepository.save(tag2);

//   const newsInfo = {
//     title: '{속보} 딜리버블 짱',
//     category: Category.HEALTH,
//     tags: [tag1, tag2],
//     announcerGender: Gender.MEN,
//     channel: Channel.SBS,
//     link: 'https://www.youtube.com/watch?v=ah6nDLl4_oA&t=1391s',
//     time: new Time(23, 28),
//     runningTime: new Time(0, 24),
//     suitability: Suitability.MEDIUM,
//     isEmbeddable: true,
//     reportDate: new Date('2022-05-29'),
//   };
//   const news = newsRepository.create(newsInfo);
//   const news2 = await newsRepository.save(news);
//   const news3 = await newsRepository.find({
//     relations: ['tags'],
//     where: {
//       id: news2.id,
//     },
//   });
//   console.log('>>>>>>>>>', news3);
//   app.listen(8080, () => {
//     console.log('server is listening 8080');
//   });
// });




createConnection().then(async (connection) => {
  app.listen(8080, () => {
    console.log('server is listening 8080');
  });
});
