import { getConnection } from 'typeorm';

import { Logger } from 'tslog';
import { CreateHighlight, HighlightInfo } from '../types';
import { HighlightQueryRepository } from '../repository/HighlightRepository';
import { Highlight } from '../entity/Highlight';
import UserService from './UserService';

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToMySql = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(HighlightQueryRepository);
};

const createHighlight = async (createHighlight: CreateHighlight): Promise<any> => {
  const highlightRepository = await getConnectionToMySql();
  //   const user = UserService.searchByUserId(createHighlight.userId);
  //   highlightInfo.userId = user;
  log.debug(' createHighlight.scriptId ', createHighlight.scriptId);
  // log.debug(' highlightInfo ', highlightInfo);
  // let highlightInfo: HighlightInfo;
  // highlightInfo.scriptId = createHighlight.scriptId;
  // highlightInfo.startingIndex = createHighlight.startingIndex;
  // highlightInfo.endingIndex = createHighlight.endingIndex;
  await highlightRepository.createHighlight(createHighlight);
  const highlightData = highlightRepository.findAllHighlight();
  return highlightData;
};

export default {
    createHighlight,
}
