import { Router } from 'express';
import * as balanceController from '../controllers/balance';
import { auth } from '../middleware/auth';

const routerBalance = Router();

routerBalance.get('/balance', auth, balanceController.getBalance);

export default routerBalance;
