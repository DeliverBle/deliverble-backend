import { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import UserController from "./UserController";

import { Logger } from 'tslog';
import { CreateHighlight } from '../types';
import message from '../modules/responseMessage';
import HighlightService from '../service/HighlightService';
import util from '../modules/util';
const log: Logger = new Logger({ name: '딜리버블 백엔드 짱짱' });


export const createHighlight = async (req: Request, res: Response): Promise<void | Response> => {
    const tokensAndUserId = await UserController.getTokensParsedFromBody(req.body);
    const accessToken = tokensAndUserId.accessToken;
    const userId = tokensAndUserId.userId;
    const scriptId = req.body.script_id;
    const startingIndex = req.body.starting_index;
    const endingIndex = req.body.ending_index;
    const createHighlight = new CreateHighlight(userId, scriptId, startingIndex, endingIndex);

    try {
      const data = await HighlightService.createHighlight(createHighlight);
      res.status(statusCode.CREATED).send(util.success(
        statusCode.OK,
        message.CREATE_HIGHLIGHT_SUCCESS, data
      ));
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
}
