import { Router } from 'express';

import * as transactionsController from '../controllers/transactions';
import { auth } from '../middleware/auth';

const transactionRouter = Router();

transactionRouter.get('/transfer', auth, transactionsController.getAllTransfers);
transactionRouter.post('/transfer', auth, transactionsController.transfer);

export default transactionRouter;
