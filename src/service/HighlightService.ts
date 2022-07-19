import {getConnection} from 'typeorm';

import {Logger} from 'tslog';
import {CreateHighlight} from '../types';
import {HighlightQueryRepository} from '../repository/HighlightRepository';
import UserService, {findUserByKakaoId} from './UserService';
import {HighlightCommandRepository} from "../repository/HighlightCommandRepository";
import CustomError from "../error/CustomError";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import {Highlight} from "../entity/Highlight";
import NewsService from "./NewsService";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToHighlightQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightQueryRepository);
};
const getConnectionToHighlightCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightCommandRepository);
};

const getHighlightByKakaoIdAndNewsId = async (kakaoId: number, newsId: number): Promise<any> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();

  const user = await UserService.findUserByKakaoId(kakaoId.toString());
  const userId = user.id;

  log.debug('userId', userId);

  const highlightOfAllUserId = await highlightQueryRepository.findAllHighlightByUserId(userId);
  const scriptIdsOfNewsId = await NewsService.findScriptIdsByNewsId(newsId.toString());

  const returnHighlights = highlightOfAllUserId.filter(highlight => scriptIdsOfNewsId.includes(highlight.scriptId));
  returnHighlights.forEach((highlight) => log.debug(" highlight", highlight))
  return returnHighlights;
}

const createHighlight = async (createHighlight: CreateHighlight): Promise<Highlight> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();

  const user = await UserService.searchByUserId(createHighlight.userId);
  const highlight = createHighlight.toEntity(user);
  log.debug(' createHighlight.scriptId ', createHighlight.scriptId);

  try {
    // save highlight
    const savedHighlight = await highlightCommandRepository.saveNewHighlight(highlight);
    log.debug('savedHighlight ', savedHighlight);
    return getHighlightByKakaoIdAndNewsId(Number(createHighlight.userId), createHighlight.scriptId);
  } catch (error) {
    log.error('error', error);
    // TODO: make new custom error
    throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId
};
