import {EntityRepository, getConnection, Repository} from 'typeorm';
import {User} from '../entity/User';
import {Logger} from 'tslog';
import CustomError from "../error/CustomError";

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
    const userRepository = await getConnection().getRepository(User);
    try {
      return await userRepository.findOneOrFail({
        where: {
          kakaoId: kakaoId,
        },
        relations: ['favoriteNews'],
      });
    } catch (err) {
      log.debug(" >> ERR ", err)
      throw new CustomError(404, "User Not Found")
    }
  }
}
