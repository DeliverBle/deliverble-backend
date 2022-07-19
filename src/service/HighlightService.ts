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

  const scriptIdsOnReturnHighlights = [
    ...new Set(returnHighlights.map((highlight) => highlight['scriptId'])),
  ];

  log.debug('scriptIdsOnReturnHighlights', scriptIdsOnReturnHighlights);
  log.debug('returnHighlights', returnHighlights);

  const objectsByScriptIds = scriptIdsOnReturnHighlights.map((cur, idx, acc) => {
    if (acc.find((obj) => obj['scriptId'] === cur)) {
      return acc.find((obj) => obj['scriptId'] === cur);
    }
    const newObject = Object.create({});
    newObject.scriptId = cur;
    newObject.highlightIdx = [];
    return newObject;
  }, []);

  log.debug('objectsByScriptIds', objectsByScriptIds);

  objectsByScriptIds.map((cur, idx, acc) => {
    // filter by current scriptIds
    const filteredHighlights = returnHighlights.filter(
      (highlight) => highlight['scriptId'] === cur.scriptId,
    );
    // push highlightIdx
    filteredHighlights.map((highlight) => {
      acc[idx].highlightIdx.push([highlight.startingIndex, highlight.endingIndex]);
    });
    return acc;
  }, []);

  log.debug('objectsByScriptIds ', objectsByScriptIds);
  return objectsByScriptIds;
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

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId,
};
