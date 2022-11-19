import axios, { AxiosResponse } from 'axios'
import { IBalance } from '../interfaces/IBalance'

export default async function fetchBalance(token: string) {
  const { data } = await axios.get<unknown, AxiosResponse<IBalance>>(
    'http://localhost:3001/balance',
    {
      headers: {
        Authorization: token,
      },
    },
  )
  return data
}
