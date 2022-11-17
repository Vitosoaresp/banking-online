import { Router } from 'express';

import * as transactionsController from '../controllers/transactions';
import { auth } from '../middleware/auth';

const transactionRouter = Router();

transactionRouter.get('/cash-in', auth, transactionsController.getCashIn);
transactionRouter.get('/cash-out', auth, transactionsController.getCashOut);
transactionRouter.post('/transfer', auth, transactionsController.transfer);

export default transactionRouter;
