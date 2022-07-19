import {EntityRepository, Repository} from "typeorm";
import {Highlight} from "../entity/Highlight";

@EntityRepository(Highlight)
export class HighlightCommandRepository extends Repository<Highlight> {
  async saveNewHighlight(highlight: Highlight): Promise<Highlight> {
    const newHighlight = this.create(highlight);
    return this.save(newHighlight);
  }
}