import { EntityRepository, Repository } from 'typeorm';
import { News } from '../entity/News';
import { User } from '../entity/User';
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  // id로 1개의 News 조회
  findById(id: number) {
    return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  findByEmail(email: string) {
    log.debug('email: ', email);
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOneOrFail();
  }
}
