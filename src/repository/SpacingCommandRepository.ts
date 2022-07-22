import { Logger } from "tslog";
import {DeleteResult, EntityRepository, Repository} from "typeorm";
import { Spacing } from "../entity/Spacing/Spacing";
import {SpacingReturnDTO} from "../entity/Spacing/types/SpacingReturnDTO";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(Spacing)
export class SpacingCommandRepository extends Repository<Spacing> {
  async saveNewSpacing(spacing: Spacing): Promise<Spacing> {
    const newSpacing = this.create(spacing);
    return this.save(newSpacing);
  };

  async removeSpacingBySpacingId(spacingId: number): Promise<boolean> {
    try {
      const removedSpacing = await this.delete({id: spacingId});
      const booleanRemovedOrNot: boolean = Boolean(removedSpacing['affected'])
      log.debug('boolean result of removed or not', booleanRemovedOrNot);
      return booleanRemovedOrNot
    } catch (err) {
      log.error(err);
      return false;
    }
  };
}
