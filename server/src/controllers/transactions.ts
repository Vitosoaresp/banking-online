import { Request, Response } from 'express';
import { ICreateTransaction } from '../interfaces/transaction';
import * as transactionsService from '../service/transactions';

export const getCashIn = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.user;
    const { code, data } = await transactionsService.getCashIn(id);
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
}

export const getCashOut = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.user;
    const { code, data } = await transactionsService.getCashOut(id);
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
}

export const transfer = async (req: Request<unknown, unknown, ICreateTransaction>, res: Response) => {
  const { id } = res.locals.user;
  const { accountIn, value } = req.body;

  const newTransfer = await transactionsService.transfer(id, accountIn, value);
  if (!newTransfer) {
    return res.status(500).json({ message: 'Error interno' });
  }
  return res.status(newTransfer.code).json(newTransfer.data);
}