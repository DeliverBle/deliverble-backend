import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';
import { User } from '../entity/User';

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  // id로 1개의 News 조회
  findById(id: number) {
    return this.createQueryBuilder('news').where('user.id = :id', { id }).getOne();
  }

  findByEmail(email: string) {
    return this.createQueryBuilder('news').where('user.email = :email', { email }).getOne();
  }
}
