import { Logger } from "tslog";
import { getConnection } from "typeorm";
import { Spacing } from "../entity/Spacing";
import CustomError from "../error/CustomError";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import { SpacingCommandRepository } from "../repository/SpacingCommandRepository";
import { SpacingQueryRepository } from "../repository/SpacingQueryRepository";
import { CreateSpacing } from "../types";
import NewsService from "./NewsService";
import UserService from "./UserService";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToSpacingQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(SpacingQueryRepository);
};

const getConnectionToSpacingCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(SpacingCommandRepository);
};

const getSpacingByKakaoIdAndNewsId = async (kakaoId: number, newsId: number): Promise<any> => {
  const spacingQueryRepository = await getConnectionToSpacingQueryRepository();

  const user = await UserService.findUserByKakaoId(kakaoId.toString());
  const userId = user.id;	

	const spacingOfAllUserId = await spacingQueryRepository.findAllSpacingByUserId(userId);
  log.debug('newsId', newsId);
	const scriptIdsOfNewsId = await NewsService.findScriptIdsByNewsId(newsId.toString());

	log.debug('spacingOfAllUserId', spacingOfAllUserId);
	log.debug('scriptIdsOfNewsId', scriptIdsOfNewsId);
	
	
	const spacingByKakaoIdAndNewsId = spacingOfAllUserId.filter((spacing) =>
		scriptIdsOfNewsId.includes(spacing.scriptId),
	)
	log.debug('spacingByKakaoIdAndNewsId', spacingByKakaoIdAndNewsId);
	return spacingByKakaoIdAndNewsId;
}

const createSpacing = async (createSpacing: CreateSpacing): Promise<Spacing> => {
	// const spacingQueryRepository = await getConnectionToSpacingQueryRepository();
	const spacingCommandRepository = await getConnectionToSpacingCommandRepository();

	const user = await UserService.searchByUserId(createSpacing.userId);
	const spacing = createSpacing.toEntity(user);

	try {
		// save highlight
		const savedSpacing = await spacingCommandRepository.saveNewSpacing(spacing);
		log.debug('savedHighlight ', savedSpacing);
		return await getSpacingByKakaoIdAndNewsId(Number(createSpacing.userId), createSpacing.newsId);
	} catch (error) {
		log.error('error', error);
		// TODO: make new custom error
		throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
	}
};
  
  export default {
    createSpacing,
  };
