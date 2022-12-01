import axios, { AxiosResponse } from 'axios'

import { ICreateTransfer, ITransactions } from '../interfaces/ITransfer'

export async function fetchCreateTransfer({
  accountIn,
  value,
  token,
}: ICreateTransfer & { token: string }) {
  const { data } = await axios.post(
    'https://banking-online-production.up.railway.app/transfer',
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
    'https://banking-online-production.up.railway.app/transfer',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  return data
}
