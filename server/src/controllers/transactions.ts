import { Request, Response } from 'express';
import { ICreateTransaction } from '../interfaces/transaction';
import * as transactionsService from '../service/transactions';

export const getAllTransfers = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.user;
    const { code, data } = await transactionsService.getTransfers(id);
    return res.status(code).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno' });
  }
}

export const transfer = async (req: Request<unknown, unknown, ICreateTransaction>, res: Response) => {
  const { id } = res.locals.user;
  const { accountIn, value } = req.body;

  const { data, error, code } = await transactionsService.transfer(id, accountIn, value);
  if (error) {
    return res.status(code).json({ error });
  }
  return res.status(code).json(data);
}
