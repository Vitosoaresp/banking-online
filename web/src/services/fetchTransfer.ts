import axios from 'axios';

import { ICreateTransfer } from '../interfaces/ITransfer';

export async function fetchCreateTransfer({ accountIn, value, token }: ICreateTransfer & { token: string }) {
  const { data } = await axios.post('http://localhost:3001/transfer', { accountIn, value }, {
    headers: {
      Authorization: token,
    },
  });
  return data;
}