import { Logger } from "tslog";
import {EntityRepository, Repository} from "typeorm";
import { Spacing } from "../entity/Spacing";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(Spacing)
export class SpacingCommandRepository extends Repository<Spacing> {
  async saveNewSpacing(spacing: Spacing): Promise<Spacing> {
    const newSpacing = this.create(spacing);
    return this.save(newSpacing);
  };

  async removeSpacingBySpacingId(spacingId: number): Promise<boolean> {
    try {
      await this.delete({id: spacingId});
      return true;
    } catch (err) {
      log.error(err);
      return false;
    }
  };
}
