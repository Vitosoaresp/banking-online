import cors from 'cors';
import express from 'express';

import balanceRouter from './routes/balance';
import transactionRouter from './routes/transaction';
import userRouter from './routes/user';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use(userRouter);
app.use(balanceRouter);
app.use(transactionRouter);

app.get('/', (_req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
