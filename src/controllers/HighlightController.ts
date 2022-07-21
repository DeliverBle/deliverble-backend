import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import UserController from './UserController';

import { Logger } from 'tslog';
import {
  AddMemoDTO,
  CreateHighlight,
  RemoveExistingMemoDTO,
  UpdateExistingMemoDTO,
} from '../types';
import message from '../modules/responseMessage';
import HighlightService from '../service/HighlightService';
import util from '../modules/util';
const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const createHighlight = async (req: Request, res: Response): Promise<void | Response> => {
  const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  let kakaoId = tokensAndUserId.userId;
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const scriptId = req.body.script_id;
  const startingIndex = req.body.starting_index;
  const endingIndex = req.body.ending_index;
  const createHighlight = new CreateHighlight(
    accessToken,
    kakaoId,
    scriptId,
    startingIndex,
    endingIndex,
  );

  try {
    const data = (await HighlightService.createHighlight(createHighlight))
      .highlightReturnCollection;
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.CREATE_HIGHLIGHT_SUCCESS, data));
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const getHighlightByKakaoIdAndNewsId = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  // const accessToken = req.body['access_token'];
  // let kakaoId = req.body['user_id'];
  // kakaoId = kakaoId.replace(/['"]+/g, '');
  // const newsId = req.body['news_id'];
  const accessToken = req.header("access_token");
  const kakaoId = req.header("user_id");
  const newsId: number = Number(req.query.news_id);
  log.debug('hello', kakaoId, newsId);

  try {
    const data = (
      await HighlightService.getHighlightByKakaoIdAndNewsId(accessToken, kakaoId, newsId)
    ).highlightReturnCollection;
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_HIGHLIGHT_SUCCESS, data));
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const removeHighlightByKakaoIdAndHighlightId = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const accessToken = req.body['access_token'];
  let kakaoId = req.body['user_id'];
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const highlightId = req.body['highlight_id'];
  log.debug('hello', kakaoId, highlightId);

  try {
    const data = await HighlightService.removeHighlightByHighlightId(
      accessToken,
      kakaoId,
      highlightId,
    );
    res
      .status(statusCode.OK)
      .send(
        util.success(
          statusCode.OK,
          message.REMOVE_HIGHLIGHT_SUCCESS,
          data.highlightReturnCollection,
        ),
      );
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const addNewMemoOfHighlight = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const accessToken = req.body['access_token'];
  let kakaoId = req.body['user_id'];
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const highlightId = req.body['highlight_id'];
  const keyword = req.body['keyword'];
  const content = req.body['content'];
  log.debug('hello', kakaoId, highlightId, keyword, content);

  try {
    const data = (
      await HighlightService.addMemoOfHighlight(
        new AddMemoDTO(accessToken, kakaoId, highlightId, keyword, content),
      )
    ).highlightReturnCollection;
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.ADD_MEMO_SUCCESS, data));
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const removeExistingMemoOfHighlight = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const accessToken = req.body['access_token'];
  let kakaoId = req.body['user_id'];
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const highlightId = req.body['highlight_id'];
  log.debug('removeExistingMemoOfHighlight >>>>>>>>>>>>> ', kakaoId, highlightId);

  try {
    const data = (
      await HighlightService.removeExistingMemoOfHighlight(
        new RemoveExistingMemoDTO(accessToken, kakaoId, highlightId),
      )
    ).highlightReturnCollection;
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.REMOVE_MEMO_SUCCESS, data));
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export const updateExistingMemoOfHighlight = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  const accessToken = req.body['access_token'];
  let kakaoId = req.body['user_id'];
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const highlightId = req.body['highlight_id'];
  const keyword = req.body['keyword'];
  const content = req.body['content'];
  log.debug('updateMemoOfHighlight >>>>>>>>>>>>> ', kakaoId, highlightId, keyword, content);

  try {
    const data = (
      await HighlightService.updateMemoOfHighlight(
        new UpdateExistingMemoDTO(accessToken, kakaoId, highlightId, keyword, content),
      )
    ).highlightReturnCollection;
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_MEMO_SUCCESS, data));
  } catch (err) {
    log.error(err);
    if (err.response !== undefined) {
      log.error(err.response.status);
      res.status(err.response.status).send({
        status: err.response.status,
        message: {
          refresh: 'fail',
          message: err.message,
        },
      });
    }
    res.status(err.code).send({
      status: err.code,
      message: {
        refresh: 'fail',
        message: err.message,
      },
    });
  }
};

export default {
  createHighlight,
  getHighlightByKakaoIdAndNewsId,
  removeHighlightByKakaoIdAndHighlightId,
  addNewMemoOfHighlight,
  removeExistingMemoOfHighlight,
  updateExistingMemoOfHighlight,
};
