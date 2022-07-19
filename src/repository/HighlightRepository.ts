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

  createHighlight = async (createHighlight: CreateHighlight) => {
    // const channels = createHighlight.channels;
    return this.createQueryBuilder('highlight')
      .insert()
      .into(Highlight)
      .values([
          { 
            // userId: createHighlight.userId,
            scriptId: createHighlight.scriptId,
            startingIndex: createHighlight.startingIndex,
            endingIndex: createHighlight.endingIndex,
          }
      ])
      .execute()
  }
};
