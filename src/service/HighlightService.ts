import { getConnection } from 'typeorm';

import { Logger } from 'tslog';
import {
  AddMemoDTO,
  CreateHighlight,
  HighlightReturnCollectionDTO,
  HighlightReturnDTO,
  RemoveExistingMemoDTO,
  UpdateExistingMemoDTO,
} from '../types';
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
import { is } from 'shallow-equal-object';
import ResourceNotFoundError from '../error/ResourceNotFoundError';
import { MemoCommandRepository, MemoQueryRepository } from '../repository/MemoRepository';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToHighlightQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightQueryRepository);
};

const getConnectionToHighlightCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightCommandRepository);
};

const getConnectionToMemoQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(MemoQueryRepository);
};

const getConnectionToMemoCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(MemoCommandRepository);
};

const getConnectionToScriptQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(ScriptQueryRepository);
};

const getHighlightByKakaoIdAndNewsId = async (
  accessToken: string,
  kakaoId: string,
  newsId: number,
): Promise<HighlightReturnCollectionDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  log.debug('accessToken', accessToken);
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  const user = await UserService.findUserByKakaoId(kakaoId.toString());
  log.debug('user >>> ', user);
  const userId = user.id;

  log.debug('userId', userId);

  const highlightOfAllUserId = await highlightQueryRepository.findAllHighlightByUserId(userId);
  const scriptIdsOfNewsId = await NewsService.findScriptIdsByNewsId(newsId.toString());

  const returnHighlights = highlightOfAllUserId.filter((highlight) =>
    scriptIdsOfNewsId.includes(highlight.scriptId),
  );

  const highlightReturnDTOArray = returnHighlights.map(
    async (highlight) => await HighlightReturnDTO.createHighlightReturnDTOWithMemo(highlight),
  );

  return HighlightReturnCollectionDTO.createCollection(await Promise.all(highlightReturnDTOArray));
};

const findNewsIdOfScriptId = async (scriptId: number): Promise<number> => {
  const scriptQueryRepository = await getConnectionToScriptQueryRepository();
  return await scriptQueryRepository.findNewsIdOfScriptId(scriptId);
};

const createHighlight = async (
  createHighlight: CreateHighlight,
): Promise<HighlightReturnCollectionDTO> => {
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
): Promise<HighlightReturnCollectionDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();
  let toBeDeletedHighlight;
  try {
    toBeDeletedHighlight = await highlightQueryRepository.findHighlightByHighlightId(highlight_id);
  } catch (err) {
    throw new ResourceNotFoundError();
  }
  const scriptId = toBeDeletedHighlight.scriptId;
  const isHighlightDeleted = await highlightCommandRepository.removeHighlight(toBeDeletedHighlight);
  if (!isHighlightDeleted) {
    throw new CustomError(statusCode.NOT_FOUND, message.NOT_FOUND);
  }
  const newsId = await findNewsIdOfScriptId(scriptId);
  return await getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId);
};

const addMemoOfHighlight = async (
  addMemoDTO: AddMemoDTO,
): Promise<HighlightReturnCollectionDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();
  const memoCommandRepository = await getConnectionToMemoCommandRepository();

  let highlight;

  try {
    log.debug('addMemoDTO.highlightId >>>> ', addMemoDTO.highlightId);
    highlight = await highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(
      addMemoDTO.highlightId,
    );
    log.debug(' HIGHLIGHT >>>>>>>>>>>>>>>>>>>>>>>>> ', highlight);
  } catch (err) {
    throw new ResourceNotFoundError();
  }

  const scriptId = highlight.scriptId;

  const memo = addMemoDTO.toEntity();
  const memoSaved = await memoCommandRepository.registerOrSaveMemo(memo);
  log.debug('memoSaved : >>>>>>>>>>>>> ', memoSaved);

  const addedMemoHighlight = await highlight.addNewMemo(memo);
  const isHighlightUpdated = await highlightCommandRepository.registerOrSaveHighlight(
    addedMemoHighlight,
  );
  log.debug(' HIGHLIGHT UPDATED ', isHighlightUpdated);

  const newsId = await findNewsIdOfScriptId(scriptId);

  return await getHighlightByKakaoIdAndNewsId(addMemoDTO.accessToken, addMemoDTO.kakaoId, newsId);
};

const removeExistingMemoOfHighlight = async (
  removeExistingMemoDTO: RemoveExistingMemoDTO,
): Promise<HighlightReturnCollectionDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();
  let highlight;

  try {
    highlight = await highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(
      removeExistingMemoDTO.highlightId,
    );
  } catch (err) {
    throw new ResourceNotFoundError();
  }

  const scriptId = highlight.scriptId;

  const removedMemoHighlight = await highlight.removeExistingMemo();
  log.debug(' REMOVED MEMO HIGHLIGHT ', removedMemoHighlight);
  const isHighlightUpdated = await highlightCommandRepository.updateHighlight(removedMemoHighlight);
  log.debug(' HIGHLIGHT MEMO DELETED ', isHighlightUpdated);

  const newsId = await findNewsIdOfScriptId(scriptId);

  return await getHighlightByKakaoIdAndNewsId(
    removeExistingMemoDTO.accessToken,
    removeExistingMemoDTO.kakaoId,
    newsId,
  );
};

const updateMemoOfHighlight = async (
  updateMemoDTO: UpdateExistingMemoDTO,
): Promise<HighlightReturnCollectionDTO> => {
  const highlightQueryRepository = await getConnectionToHighlightQueryRepository();
  const highlightCommandRepository = await getConnectionToHighlightCommandRepository();

  // TODO: 이렇게 접근하는 것은 DDD 원칙에 위배된다는 것은 알아두자. 어떻게 해야 리팩토링할 수 있을까 추후 고민해보자.
  // TODO: memo_id만 주어졌을 때, highlight DB를 뒤져서 memo_id에 해당하는 highlight_id를 반환해야 한다.
  const memoQueryRepository = await getConnectionToMemoQueryRepository();
  const memoCommandRepository = await getConnectionToMemoCommandRepository();

  const toBeUpdatedMemo = await memoQueryRepository.findMemoById(updateMemoDTO.memoId);
  const toUpdateMemo = await memoCommandRepository.updateExistingMemo(toBeUpdatedMemo);
  log.debug(' MEMO UPDATED ', toUpdateMemo);

  const highlightId = toUpdateMemo.highlight.id;

  let highlight: Highlight;

  try {
    highlight = await highlightQueryRepository.findByHighlightByHighlightIdInActiveRecordManner(
      highlightId,
    );
  } catch (err) {
    throw new ResourceNotFoundError();
  }

  const scriptId = highlight.scriptId;

  const updatedMemoHighlight = await highlight.updateExistingMemo(toUpdateMemo);
  const isHighlightUpdated = await highlightCommandRepository.updateHighlight(updatedMemoHighlight);
  log.debug(' HIGHLIGHT MEMO UPDATED ', isHighlightUpdated);

  const newsId = await findNewsIdOfScriptId(scriptId);

  return await getHighlightByKakaoIdAndNewsId(
    updateMemoDTO.accessToken,
    updateMemoDTO.kakaoId,
    newsId,
  );
};

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId,
  removeHighlightByHighlightId,
  addMemoOfHighlight,
  removeExistingMemoOfHighlight,
  updateMemoOfHighlight
};
