import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle } from '../models';
import { Id } from 'objection';

export const get = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  const battle = await Battle.query().findById(id);
  if (!battle) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
  return res.status(StatusCodes.OK).json(battle);
};

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  const id: Id = req.params.id;
  const deleted = await Battle.query().deleteById(id);
  if (deleted === 0) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }
  return res.sendStatus(StatusCodes.NO_CONTENT);
}

export const BattleController = {
  get,
  list,
  remove
};
