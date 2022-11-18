import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IUser, IUserLogin } from '../interfaces/IUser';
import fetchBalance from '../services/fetchBalance';
import fetchUsers from '../services/fetchUsers';

type BankingContextType = {
  balance: number | null;
  setBalance: Dispatch<SetStateAction<number | null>>
  users: IUser[];
}

export const bankingContext = createContext({} as BankingContextType);

interface IBankingContextProviderProps {
  children: React.ReactNode;
}

export default function BankingContextProvider({ children }: IBankingContextProviderProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);

  const userData = localStorage.getItem('user');

  useEffect(() => {
    if (userData) {
      const { token } = JSON.parse(userData) as IUserLogin;
      const getBalance = async () => {
        const { balance } = await fetchBalance(token);
        setBalance(balance);
      };
      const getUsers = async () => {
        const users = await fetchUsers();
        setUsers(users);
      };

      getUsers();
      getBalance();
    }
  }, [userData]);

  return (
    <bankingContext.Provider value={{ balance, setBalance, users }}>
      {children}
    </bankingContext.Provider>
  )
}
