import { User } from '../entity/User';

const userInfo = {
  nickname: 'pobi',
  email: 'javajigi@gmail.com',
  gender: '남자',
};

export const MockUserToFavorite = async (connection) => {
  // initialize before inserting a mock data
  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  console.log('queryRunner executed');
  const userRepository = await User.getRepository();

  await userRepository.query(`set FOREIGN_KEY_CHECKS = 0`);
  await userRepository.clear();
  await userRepository.query(`set FOREIGN_KEY_CHECKS = 1`);

  let user1 = new User(userInfo.nickname, userInfo.email, userInfo.gender);
  await userRepository.save(user1);

  return userRepository.find({
    where: {
      nickname: userInfo.nickname,
    },
  });
};
