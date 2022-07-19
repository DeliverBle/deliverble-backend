import { getConnection } from 'typeorm';

import { Logger } from 'tslog';
import { CreateHighlight, HighlightReturnDTO } from '../types';
import { HighlightQueryRepository } from '../repository/HighlightRepository';
import UserService, { findUserByKakaoId } from './UserService';
import { HighlightCommandRepository } from '../repository/HighlightCommandRepository';
import CustomError from '../error/CustomError';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import { Highlight } from '../entity/Highlight';
import NewsService from './NewsService';
import { ScriptQueryRepository } from '../repository/ScriptQueryRepository';

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

const getHighlightByKakaoIdAndNewsId = async (kakaoId: number, newsId: number): Promise<any> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();

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
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();

  const user = await UserService.searchByUserId(createHighlight.userId);
  const highlight = createHighlight.toEntity(user);
  log.debug(' createHighlight.scriptId ', createHighlight.scriptId);

  try {
    // save highlight
    const savedHighlight = await highlightCommandRepository.saveNewHighlight(highlight);
    log.debug('savedHighlight ', savedHighlight);

    // get newsId of highlight
    const newsId = await findNewsIdOfScriptId(savedHighlight.scriptId);

    return await new HighlightReturnDTO(savedHighlight);
  } catch (error) {
    log.error('error', error);
    // TODO: make new custom error
    throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
  }
};

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId,
};
