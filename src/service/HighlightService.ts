import { getConnection } from 'typeorm';

import { Logger } from 'tslog';
import { CreateHighlight, HighlightReturnDTO } from '../types';
import { HighlightQueryRepository } from '../repository/HighlightRepository';
import UserService, { doesAccessTokenExpire, findUserByKakaoId } from './UserService';
import { HighlightCommandRepository } from '../repository/HighlightCommandRepository';
import CustomError from '../error/CustomError';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import { Highlight } from '../entity/Highlight';
import NewsService from './NewsService';
import { ScriptQueryRepository } from '../repository/ScriptQueryRepository';
import DuplicateStartingIndexAndEndingIndex from '../error/DuplicateStartingIndexAndEndingIndex';
import AccessTokenExpiredError from '../error/AccessTokenExpiredError';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToHighlightQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightQueryRepository);
};
const getConnectionToHighlightCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightCommandRepository);
};

const getConnectionToScriptQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(ScriptQueryRepository);
};

const getHighlightByKakaoIdAndNewsId = async (
  accessToken: string,
  kakaoId: string,
  newsId: number,
): Promise<any> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  log.debug('accessToken', accessToken);
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  const user = await UserService.findUserByKakaoId(kakaoId.toString());
  const userId = user.id;

  log.debug('userId', userId);

  const highlightOfAllUserId = await highlightQueryRepository.findAllHighlightByUserId(userId);
  const scriptIdsOfNewsId = await NewsService.findScriptIdsByNewsId(newsId.toString());

  const returnHighlights = highlightOfAllUserId.filter((highlight) =>
    scriptIdsOfNewsId.includes(highlight.scriptId),
  );

  return returnHighlights.map((highlight) => new HighlightReturnDTO(highlight));
};

const findNewsIdOfScriptId = async (scriptId: number): Promise<number> => {
  const scriptQueryRepository = await getConnectionToScriptQueryRepository();
  return await scriptQueryRepository.findNewsIdOfScriptId(scriptId);
};

const createHighlight = async (createHighlight: CreateHighlight): Promise<HighlightReturnDTO> => {
  const accessToken = createHighlight.accessToken;
  const kakaoId = createHighlight.kakaoId;
  const scriptId = createHighlight.scriptId;
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();

  const user = await UserService.searchByUserId(kakaoId);
  const highlight = createHighlight.toEntity(user);
  log.debug(' createHighlight.scriptId ', scriptId);

  try {
    // save highlight
    const savedHighlight = await highlightCommandRepository.saveNewHighlight(highlight);
    log.debug('savedHighlight ', savedHighlight);

    // get newsId of highlight
    const newsId = await findNewsIdOfScriptId(scriptId);
    return await getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId);
  } catch (error) {
    log.error('error', error);
    if (error.errno === 1062) {
      throw new DuplicateStartingIndexAndEndingIndex();
    }
    throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

const removeHighlightByHighlightId = async (
  accessToken: string,
  kakaoId: string,
  highlight_id: number,
): Promise<HighlightReturnDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();
  const toBeDeletedHighlight = await highlightQueryRepository.findHighlightByHighlightId(
    highlight_id,
  );
  const scriptId = toBeDeletedHighlight.scriptId;
  const isHighlightDeleted = await highlightCommandRepository.removeHighlight(toBeDeletedHighlight);
  if (!isHighlightDeleted) {
    throw new CustomError(statusCode.NOT_FOUND, message.NOT_FOUND);
  }
  const newsId = await findNewsIdOfScriptId(scriptId);
  return await getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId);
};

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId,
  removeHighlightByHighlightId
};
