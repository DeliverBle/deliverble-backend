import { EntityRepository, Repository } from 'typeorm';
import { Memo } from '../entity/Memo';
import { Highlight } from '../entity/Highlight';

@EntityRepository(Memo)
export class MemoCommandRepository extends Repository<Memo> {
  async registerOrSaveMemo(memo: Memo): Promise<Memo> {
    const newHighlight = this.create(memo);
    return this.save(memo);
  }
}
