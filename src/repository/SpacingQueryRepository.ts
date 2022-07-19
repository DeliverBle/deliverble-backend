import { EntityRepository, Repository } from 'typeorm';
import { Spacing } from '../entity/Spacing';

@EntityRepository(Spacing)
export class SpacingQueryRepository extends Repository<Spacing> {
  findAllSpacingByUserId = async (user_id: number) => {
      return await this.createQueryBuilder('spacing')
        .where('spacing.user_id = :user_id', { user_id })
        .getMany();
  }
};
