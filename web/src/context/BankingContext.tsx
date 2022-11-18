import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IUserLogin } from '../interfaces/IUser';
import fetchBalance from '../services/fetchBalance';

type BankingContextType = {
  balance: number | null;
  setBalance: Dispatch<SetStateAction<number | null>>
}

export const bankingContext = createContext({} as BankingContextType);

interface IBankingContextProviderProps {
  children: React.ReactNode;
}

export default function BankingContextProvider({ children }: IBankingContextProviderProps) {
  const [balance, setBalance] = useState<number | null>(null);

  const userData = localStorage.getItem('user');

  useEffect(() => {
    if (userData) {
      const { token } = JSON.parse(userData) as IUserLogin;
      const getBalance = async () => {
        const { balance } = await fetchBalance(token);
        setBalance(balance);
      };
      getBalance();
    }
  }, [userData]);

  return (
    <bankingContext.Provider value={{ balance, setBalance }}>
      {children}
    </bankingContext.Provider>
  )
}
