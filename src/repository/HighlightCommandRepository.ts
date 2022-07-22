import {EntityRepository, Repository} from "typeorm";
import {Highlight} from "../entity/Highlight/Highlight";
import {Logger} from "tslog";
import {Memo} from "../entity/Memo/Memo";
import {User} from "../entity/User/User";

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

  async registerOrSaveHighlight(highlight: Highlight): Promise<Highlight> {
    const newHighlight = this.create(highlight);
    return this.save(newHighlight);
  }

  updateHighlight = async (highlight: Highlight): Promise<Highlight> => {
    try {
      await this.save(highlight);
      return highlight;
    } catch (err) {
      log.error(err);
      throw err;
    }
  }
}
