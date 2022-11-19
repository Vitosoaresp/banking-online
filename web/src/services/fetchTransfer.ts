import axios, { AxiosResponse } from 'axios'

import { ICreateTransfer, ITransactions } from '../interfaces/ITransfer'

export async function fetchCreateTransfer({
  accountIn,
  value,
  token,
}: ICreateTransfer & { token: string }) {
  const { data } = await axios.post(
    'http://localhost:3001/transfer',
    { accountIn, value },
    {
      headers: {
        Authorization: token,
      },
    },
  )
  return data
}

export async function fetchGetTransfers(token: string) {
  const { data } = await axios.get<unknown, AxiosResponse<ITransactions[]>>(
    'http://localhost:3001/transfer',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  return data
}
