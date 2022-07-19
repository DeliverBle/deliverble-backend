import {EntityRepository, Repository} from "typeorm";
import {Highlight} from "../entity/Highlight";
import {Logger} from "tslog";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

@EntityRepository(Highlight)
export class HighlightCommandRepository extends Repository<Highlight> {
  async saveNewHighlight(highlight: Highlight): Promise<Highlight> {
    const newHighlight = this.create(highlight);
    return this.save(newHighlight);
  }

  async removeHighlightByHighlightId(highlight_id: number): Promise<boolean> {
    try {
      await this.delete({id: highlight_id});
      return true;
    } catch (err) {
      log.error(err);
      return false;
    }
  }

  removeHighlight = async (highlight: Highlight): Promise<boolean> => {
    try {
      await this.remove(highlight);
      return true;
    } catch (err) {
      log.error(err);
      return false;
    }
  }
}
