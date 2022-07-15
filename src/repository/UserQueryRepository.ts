import { EntityRepository, getConnection, Repository } from 'typeorm';
import { News } from '../entity/News';
import { User } from '../entity/User';
import { Logger } from 'tslog';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(User)
export class UserQueryRepository extends Repository<User> {
  // id로 1개의 News 조회
  findByKakaoId(kakaoId: string) {
    return (
      this.createQueryBuilder('user')
        // .leftJoinAndSelect('user.favoriteNews', 'news')
        .where('user.kakaoId = :kakaoId', { kakaoId })
        .getOneOrFail()
    );
  }

  findByEmail(email: string) {
    log.debug('email: ', email);
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOneOrFail();
  }

  async findByKakaoIdActiveRecordManner(kakaoId: string) {
    const userRepository2 = await getConnection().getRepository(User);
    const toBeUpdatedUser2 = await userRepository2.findOne({
      where: {
        kakaoId: kakaoId,
      },
      relations: ['favoriteNews'],
    });
    return toBeUpdatedUser2;
  }
}
