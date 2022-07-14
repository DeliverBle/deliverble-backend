import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';
import UserNotFoundError from '../error/UserNotFoundError';
import { KakaoRawInfo } from '../types';

// TODO: DI to be implemented
const getConnectionToUserQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(UserQueryRepository);
};

const getConnectionToUserCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(UserCommandRepository);
};

// TODO: implement Null Object Pattern
export const findUserByEmail = async (email: string): Promise<User> => {
  const userRepository = await getConnectionToUserQueryRepository();
  try {
    return await userRepository.findOneOrFail({ email });
  } catch (error) {
    return new NotFoundUser();
  }
};

export const loginUserWithKakao = async (kakaoRawInfo: KakaoRawInfo): Promise<User> => {
  const user = await findUserByEmail(kakaoRawInfo.email);
  if (isFoundUser(user)) {
    return user;
  }
  throw new UserNotFoundError();
};
