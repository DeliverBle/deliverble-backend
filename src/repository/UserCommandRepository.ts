import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserCommandRepository extends Repository<User> {
  async registerNewUser(user: User): Promise<User> {
    return await this.save(user);
  }
}
