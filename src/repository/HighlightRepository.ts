import { EntityRepository, Repository } from 'typeorm';
import { Highlight } from '../entity/Highlight';
import { CreateHighlight, HighlightInfo, SearchCondition } from '../types';

@EntityRepository(Highlight)
export class HighlightQueryRepository extends Repository<Highlight> {
  // id로 1개의 News 조회
  findById(id: number) {
    return this.createQueryBuilder('news').where('news.id = :id', { id }).getOne();
  }

  // 모든 News 조회
  findAllHighlight = async () => {
    return await this.createQueryBuilder('highlight').getMany();
  };

  findAllHighlightByUserId = async (user_id: number) => {
    return await this.createQueryBuilder('highlight')
      .where('highlight.user_id = :user_id', { user_id })
      .getMany();
  };

  findHighlightByHighlightId = async (highlight_id: number) => {
    return await this.createQueryBuilder('highlight')
      .where('highlight.id = :highlight_id', { highlight_id })
      .getOneOrFail();
  };
}
