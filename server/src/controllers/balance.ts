import { Request, Response } from 'express';
import * as balanceService from '../service/balance';

export const getBalance = async (_req: Request, res: Response) => {
  try {
    const { id } = res.locals.user;    
    const { code, data } = await balanceService.getBalance(id);
    return res.status(code).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro interno' });
  }
}