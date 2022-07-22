import { EntityRepository, Repository } from 'typeorm';
import { Memo } from '../entity/Memo/Memo';
import { Highlight } from '../entity/Highlight/Highlight';

@EntityRepository(Memo)
export class MemoQueryRepository extends Repository<Memo> {
  findMemoById = async (id: number): Promise<Memo> => {
    return await this.findOneOrFail(id);
  };
}

@EntityRepository(Memo)
export class MemoCommandRepository extends Repository<Memo> {
  async registerOrSaveMemo(memo: Memo): Promise<Memo> {
    const newHighlight = this.create(memo);
    return this.save(memo);
  }

  async updateExistingMemo(memo: Memo): Promise<Memo> {
    return this.save(memo);
  }
}
