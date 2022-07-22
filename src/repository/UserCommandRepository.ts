import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User/User';
import { Logger } from 'tslog';
import UserNotFoundError from '../error/UserNotFoundError';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(User)
export class UserCommandRepository extends Repository<User> {
  async registerOrSaveUser(user: User): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }
}
