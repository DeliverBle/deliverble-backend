import { Logger } from "tslog";
import { getConnection } from "typeorm";
import { Spacing } from "../entity/Spacing";
import AccessTokenExpiredError from "../error/AccessTokenExpiredError";
import CustomError from "../error/CustomError";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import { SpacingCommandRepository } from "../repository/SpacingCommandRepository";
import { SpacingQueryRepository } from "../repository/SpacingQueryRepository";
import { CreateSpacing, GetSpacing, RemoveSpacing, SpacingInfo, SpacingReturnCollectionDTO, SpacingReturnDTO } from "../types";
import NewsService from "./NewsService";
import UserService, { doesAccessTokenExpire } from "./UserService";

const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

const getConnectionToSpacingQueryRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(SpacingQueryRepository);
};

const getConnectionToSpacingCommandRepository = async () => {
  const connection = getConnection();
  return connection.getCustomRepository(SpacingCommandRepository);
};

const getSpacingByKakaoIdAndNewsId = async (getSpacing: GetSpacing): Promise<SpacingReturnCollectionDTO> => {
  const spacingQueryRepository = await getConnectionToSpacingQueryRepository();
	const accessToken = getSpacing.accessToken;
	const kakaoId = getSpacing.kakaoId;
	const newsId = getSpacing.newsId;
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }

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
  
  return new SpacingReturnCollectionDTO(
    spacingByKakaoIdAndNewsId.map((spacing) => new SpacingReturnDTO(spacing)),
  );
}

const createSpacing = async (createSpacing: CreateSpacing): Promise<SpacingReturnCollectionDTO> => {
	// const spacingQueryRepository = await getConnectionToSpacingQueryRepository();
	const accessToken = createSpacing.accessToken;
	const kakaoId = createSpacing.kakaoId;
	const newsId = createSpacing.newsId;
	if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
	const spacingCommandRepository = await getConnectionToSpacingCommandRepository();

	const user = await UserService.searchByUserId(kakaoId);
	const spacing = createSpacing.toEntity(user);

	try {
		// save highlight
		const savedSpacing = await spacingCommandRepository.saveNewSpacing(spacing);
		log.debug('savedHighlight ', savedSpacing);
		const getSpacing = new GetSpacing(accessToken, kakaoId, newsId);
		return await getSpacingByKakaoIdAndNewsId(getSpacing);
	} catch (error) {
		log.error('error', error);
		// TODO: make new custom error
		throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
	}
};

const getSpacing = async (getSpacing: GetSpacing): Promise<SpacingReturnCollectionDTO> => {
  const accessToken = getSpacing.accessToken;
	const kakaoId = getSpacing.kakaoId;
	const newsId = getSpacing.newsId;
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }
  return await getSpacingByKakaoIdAndNewsId(getSpacing)
}

const removeSpacing = async (removeSpacing: RemoveSpacing): Promise<SpacingReturnCollectionDTO> => {
  const accessToken = removeSpacing.accessToken;
	const kakaoId = removeSpacing.kakaoId;
	const newsId = removeSpacing.newsId;
  const spacingId = removeSpacing.spacingId;
  if (await doesAccessTokenExpire(accessToken, kakaoId)) {
    throw new AccessTokenExpiredError();
  }

	const spacingCommandRepository = await getConnectionToSpacingCommandRepository();

	const user = await UserService.searchByUserId(kakaoId);
	// const spacing = createSpacing.toEntity(user);

	try {
		// save highlight
		const removedSpacing = await spacingCommandRepository.removeSpacingBySpacingId(spacingId);
		log.debug('removedHighlight ', removedSpacing);
		const getSpacing = new GetSpacing(accessToken, kakaoId, newsId);
		return await getSpacingByKakaoIdAndNewsId(getSpacing);
	} catch (error) {
		log.error('error', error);
		// TODO: make new custom error
		throw new CustomError(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR);
	}
};

export default {
  createSpacing,
  getSpacing,
  removeSpacing,
};
