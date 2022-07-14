import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { UserQueryRepository } from '../repository/UserQueryRepository';
import { isNotFoundUser, NotFoundUser } from '../entity/NotFoundUser';
import { UserCommandRepository } from '../repository/UserCommandRepository';

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

export const loginUserWithKakao = async (email: string): Promise<User> => {
  const user = await findUserByEmail(email);
  if (isNotFoundUser(user)) {
    console.log('Not Found User >>>>>>>>>>>>>>> ', user);
    return null;
  }
  console.log(user);
  return null;
};
