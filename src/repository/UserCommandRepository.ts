import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserCommandRepository extends Repository<User> {
  registerNewUser(user: User) {
    return this.save(user);
  }
}
