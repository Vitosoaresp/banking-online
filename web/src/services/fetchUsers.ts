import axios, { AxiosResponse } from 'axios'
import { IUser } from '../interfaces/IUser'

export default async function fetchUsers() {
  const { data } = await axios.get<unknown, AxiosResponse<IUser[]>>(
    'https://banking-online-production.up.railway.app/users',
  )
  return data
}
