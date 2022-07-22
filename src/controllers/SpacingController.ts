import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import UserController from './UserController';

import { Logger } from 'tslog';
import message from '../modules/responseMessage';
import SpacingService from '../service/SpacingService';
import util from '../modules/util';
import {CreateHighlight} from "../entity/Highlight/types/CreateHighlight";
import {CreateSpacing} from "../entity/Spacing/types/CreateSpacing";
import {GetSpacing} from "../entity/Spacing/types/GetSpacing";
import {SpacingInfo} from "../entity/Spacing/types/SpacingInfo";
import {RemoveSpacing} from "../entity/Spacing/RemoveSpacing";
const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const createSpacing = async (req: Request, res: Response): Promise<void | Response> => {
  log.debug('req.query', req.query);
  const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  let kakaoId = tokensAndUserId.userId;
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const newsId = req.body.news_id;
  const scriptId = req.body.script_id;
  const index = req.body.index;
  const createSpacing = new CreateSpacing(accessToken, kakaoId, scriptId, newsId, index);

  try {
    const data = await SpacingService.createSpacing(createSpacing);
    res
      .status(statusCode.CREATED)
      .send(util.success(statusCode.OK, message.CREATE_SPACING_SUCCESS, data));
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

export const getSpacing = async (req: Request, res: Response): Promise<void | Response> => {
  const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  let kakaoId = tokensAndUserId.userId;
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const newsId = req.body.news_id;
  const getSpacing = new GetSpacing(accessToken, kakaoId, newsId);

  try {
    const data = await SpacingService.getSpacing(getSpacing);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_SPACING_SUCCESS, data));
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

export const removeSpacing = async (req: Request, res: Response): Promise<void | Response> => {
  log.debug('req.query', req.query);
  const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  let kakaoId = tokensAndUserId.userId;
  kakaoId = kakaoId.replace(/['"]+/g, '');
  const newsId = req.body.news_id;
  const spacingId = req.body.spacing_id;
  const removeSpacing = new RemoveSpacing(accessToken, kakaoId, newsId, spacingId);

  try {
    const data = await SpacingService.removeSpacing(removeSpacing);
    res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.REMOVE_SPACING_SUCCESS, data));
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
    createSpacing,
    getSpacing,
    removeSpacing,
  };
  