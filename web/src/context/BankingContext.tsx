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
  getBalanceAndTransactions: (token: string) => Promise<void>
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

  const getBalanceAndTransactions = async (token: string) => {
    const { balance } = await fetchBalance(token)
    const transactions = await fetchGetTransfers(token)
    setBalance(balance)
    setTransactions(transactions)

    const users = await fetchUsers()
    setUsers(users)
  }

  useEffect(() => {
    if (userData) {
      const { token } = JSON.parse(userData) as IUserLogin

      const getDataUser = async () => {
        await getBalanceAndTransactions(token)
      }

      getDataUser()
    }
  }, [userData])

  return (
    <bankingContext.Provider
      value={{
        balance,
        setBalance,
        users,
        transactions,
        getBalanceAndTransactions,
      }}
    >
      {children}
    </bankingContext.Provider>
  )
}
