import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import UserController from './UserController';

import { Logger } from 'tslog';
import { CreateHighlight, CreateSpacing } from '../types';
import message from '../modules/responseMessage';
import SpacingService from '../service/SpacingService';
import util from '../modules/util';
const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });

export const createSpacing = async (req: Request, res: Response): Promise<void | Response> => {
  log.debug('req.query', req.query);
  const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
  const accessToken = tokensAndUserId.accessToken;
  const userId = String(req.query.user_id);
  const newsId = Number(req.query.news_id);
  const scriptId = req.body.script_id;
  const index = req.body.index;
  const createSpacing = new CreateSpacing(accessToken, userId, scriptId, newsId, index);

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

export default {
    createSpacing,
  };
  