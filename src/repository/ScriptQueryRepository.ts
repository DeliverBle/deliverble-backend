import { EntityRepository, Repository } from 'typeorm';
import { Script } from '../entity/Script/Script';

@EntityRepository(Script)
export class ScriptQueryRepository extends Repository<Script> {
  findNewsIdOfScriptId = async (scriptId: number) => {
    const script = await this.createQueryBuilder('script')
      .where('script.id = :scriptId', { scriptId })
      .getOne();
    return script.newsId;
  };
}
