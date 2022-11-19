import axios, { AxiosResponse } from 'axios'
import { IUser } from '../interfaces/IUser'

export default async function fetchUsers() {
  const { data } = await axios.get<unknown, AxiosResponse<IUser[]>>(
    'http://localhost:3001/users',
  )
  return data
}
