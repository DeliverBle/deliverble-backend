import { User } from '../entity/User';
import { Tag } from '../entity/Tag';
import { News } from '../entity/News';
import { Suitability } from '../shared/common/Suitability';
import { Category } from '../shared/common/Category';
import { Gender } from '../shared/common/Gender';
import { Channel } from '../shared/common/Channel';
import { Time } from '../vo/Time';

// given
const userInfo = {
  nickname: 'pobi',
  email: 'javajigi@gmail.com',
  gender: '남자',
};

const userInfo3 = {
  nickname: 'JK',
  email: 'JK@gmail.com',
  gender: '남자',
};

const userInfo9 = {
  nickname: 'crong',
  email: 'crong@gmail.com',
  gender: '남자',
};

// let tagTest1_1 = new Tag();
// tagTest1_1.name = '경제';
// let tagTest1_2 = new Tag();
// tagTest1_2.name = '비트코인';
// let tagTest1_3 = new Tag();
// tagTest1_3.name = '떡상';

// const newsInfo = {
//   title: '비트코인, 한때 1만 8천 달러 붕괴',
//   category: Category.ECONOMY,
//   tags: [tagTest1_1, tagTest1_2, tagTest1_3],
//   announcerGender: Gender.MEN,
//   channel: Channel.SBS,
//   link: 'S_gtbu2VRlI',
//   thumbnail: 'https://img.youtube.com/vi/S_gtbu2VRlI/hqdefault.jpg',
//   startTime: new Time(0, 0),
//   endTime: new Time(35, 4),
//   suitability: Suitability.HIGH,
//   isEmbeddable: true,
//   reportDate: new Date('2022-06-19'),
// };

export const MockUserToFavorite = async (connection) => {
  // initialize before inserting a mock data
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  console.log('queryRunner executed');
  const userRepository = await User.getRepository();

  await userRepository.query(`set FOREIGN_KEY_CHECKS = 0`);
  await userRepository.clear();
  await userRepository.query(`set FOREIGN_KEY_CHECKS = 1`);

  // const newsRepository = await News.getRepository();
  // const tagRepository = await Tag.getRepository();

  // await tagRepository.query(`set FOREIGN_KEY_CHECKS = 0`);
  // await tagRepository.clear();

  // await newsRepository.query(`set FOREIGN_KEY_CHECKS = 0`);
  // await newsRepository.clear();

  // await tagRepository.query(`set FOREIGN_KEY_CHECKS = 1`);
  // await newsRepository.query(`set FOREIGN_KEY_CHECKS = 1`);

  // save user1
  let userMock1 = new User("2323", userInfo.nickname, userInfo.email, userInfo.gender);
  await userRepository.save(userMock1);

  let userMock3 = new User("6565", userInfo3.nickname, userInfo3.email, userInfo3.gender);
  await userRepository.save(userMock3);

  let userMock9 = new User("9832", userInfo9.nickname, userInfo9.email, userInfo9.gender);
  await userRepository.save(userMock9);

  let user1 = await userRepository.findOne({
    where: {
      nickname: userInfo.nickname,
    },
  });

  // // save tag1
  // await tagRepository.save(tagTest1_1);
  // await tagRepository.save(tagTest1_2);
  // await tagRepository.save(tagTest1_3);

  // // save news
  // const news1Mock = newsRepository.create(newsInfo);
  // const news = await newsRepository.save(news1Mock);

  // user favorite news
  // user1.addFavoriteNews(news);
  // await newsRepository.save(user1);

  return user1;
};
