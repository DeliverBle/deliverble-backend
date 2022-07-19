import {EntityRepository, Repository} from "typeorm";
import { Spacing } from "../entity/Spacing";


@EntityRepository(Spacing)
export class SpacingCommandRepository extends Repository<Spacing> {
  async saveNewSpacing(spacing: Spacing): Promise<Spacing> {
    const newSpacing = this.create(spacing);
    return this.save(newSpacing);
  }
}
