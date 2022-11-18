import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { IBalance } from '../interfaces/IBalance';

type BankingContextType = {
  balance: IBalance;
  setBalance: Dispatch<SetStateAction<IBalance>>
}

export const bankingContext = createContext({} as BankingContextType);

interface IBankingContextProviderProps {
  children: React.ReactNode;
}

export default function BankingContextProvider({ children }: IBankingContextProviderProps) {
  const [balance, setBalance] = useState<IBalance>({} as IBalance);

  return (
    <bankingContext.Provider value={{ balance, setBalance }}>
      {children}
    </bankingContext.Provider>
  )
}
