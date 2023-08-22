import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';
import { Id } from 'objection';
import { calculateFirstAttacker } from '../services';

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

const startBattle = async (req: Request, res: Response): Promise<Response> => {
  const { monsterAId, monsterBId } = req.body;
  if (!monsterAId || !monsterBId) {
    return res.sendStatus(StatusCodes.BAD_REQUEST);
  }

  const monsterA = await Monster.query().findById(monsterAId);
  if (!monsterA) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  const monsterB = await Monster.query().findById(monsterBId);
  if (!monsterB) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  const currentAttacker = calculateFirstAttacker(monsterA, monsterB);
  while(monsterA.hp > 0 || monsterB.hp > 0) {

  }
  return res;
}

export const BattleController = {
  get,
  list,
  remove,
  startBattle
};
