import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { ITransactions } from '../interfaces/ITransfer'

import { IUser, IUserLogin } from '../interfaces/IUser'
import fetchBalance from '../services/fetchBalance'
import { fetchGetTransfers } from '../services/fetchTransfer'
import fetchUsers from '../services/fetchUsers'

type BankingContextType = {
  balance: number | null
  setBalance: Dispatch<SetStateAction<number | null>>
  users: IUser[]
  transactions: ITransactions[]
}

export const bankingContext = createContext({} as BankingContextType)

interface IBankingContextProviderProps {
  children: React.ReactNode
}

export default function BankingContextProvider({
  children,
}: IBankingContextProviderProps) {
  const [balance, setBalance] = useState<number | null>(null)
  const [users, setUsers] = useState<IUser[]>([])
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  const userData = localStorage.getItem('user')

  useEffect(() => {
    if (userData) {
      const { token } = JSON.parse(userData) as IUserLogin
      const getBalance = async () => {
        const { balance } = await fetchBalance(token)
        setBalance(balance)
      }
      const getUsers = async () => {
        const users = await fetchUsers()
        setUsers(users)
      }
      const getTransactions = async () => {
        const transactions = await fetchGetTransfers(token)
        setTransactions(transactions)
      }

      getTransactions()
      getUsers()
      getBalance()
    }
  }, [userData])

  return (
    <bankingContext.Provider
      value={{ balance, setBalance, users, transactions }}
    >
      {children}
    </bankingContext.Provider>
  )
}
