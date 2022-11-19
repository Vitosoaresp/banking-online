import PaymentsIcon from '@mui/icons-material/Payments'
import PixIcon from '@mui/icons-material/Pix'
import * as Dialog from '@radix-ui/react-dialog'
import {
  ChartLineUp,
  CreditCard,
  CurrencyBtc,
  Eye,
  EyeClosed,
} from 'phosphor-react'
import { useContext, useState } from 'react'

import { AsideMenu } from '../components/AsideMenu'
import { CardTransactions } from '../components/CardTransactions'
import { CreateTransferModal } from '../components/CreateTransferModal'
import { Header } from '../components/Header'
import { bankingContext } from '../context/BankingContext'

import { IUserLogin } from '../interfaces/IUser'

export function Home() {
  const { balance, transactions } = useContext(bankingContext)
  const [visibledBalance, setVisibledBalance] = useState(false)

  const userData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUserLogin

  const filterRecentTransactions = transactions
    .reverse()
    .slice(transactions.length - 4, transactions.length)

  return (
    <>
      <Header />
      <main className="text-white w-full flex">
        <AsideMenu />
        <div className="flex flex-col md:px-20 md:ml-[230px] px-5 w-full">
          <div className="flex mt-10 md:gap-20 gap-10 md:flex-nowrap flex-wrap">
            <div className="w-[450px] h-48 bg-zinc-300 py-14 md:px-20 px-10 justify-center rounded-md gap-5 flex flex-col">
              <p className="font-semibold text-2xl text-black">
                Olá, {userData && userData.username}
              </p>
              <div className="flex flex-col">
                <p className="text-zinc-800 opacity-80 text-sm flex gap-2 items-center transition-all">
                  Seu saldo atual é
                  {visibledBalance ? (
                    <Eye
                      weight="thin"
                      size={20}
                      className="text-black/70 cursor-pointer"
                      onClick={() => setVisibledBalance(false)}
                    />
                  ) : (
                    <EyeClosed
                      weight="thin"
                      size={20}
                      className="text-black/70 cursor-pointer"
                      onClick={() => setVisibledBalance(true)}
                    />
                  )}
                </p>
                <span className="text-2xl text-black font-semibold">
                  {!visibledBalance
                    ? '*****'
                    : balance === null
                    ? 'Não foi possível carregar seu saldo'
                    : `R$ ${(balance / 100).toFixed(2).split('.').join(',')}`}
                </span>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap">
              <Dialog.Root>
                <Dialog.Trigger className="bg-zinc-200 hover:bg-zinc-400 transition-colors duration-300 rounded-full h-20 w-20 flex items-center justify-center text-black">
                  <PixIcon fontSize="large" />
                </Dialog.Trigger>

                <CreateTransferModal />
              </Dialog.Root>

              <div className="bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black cursor-not-allowed">
                <ChartLineUp size={35} weight="fill" />
              </div>

              <div className="bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black cursor-not-allowed">
                <CreditCard size={35} weight="fill" />
              </div>

              <div className="bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black cursor-not-allowed">
                <PaymentsIcon fontSize="large" />
              </div>

              <div className="bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black cursor-not-allowed">
                <CurrencyBtc size={35} weight="fill" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col pb-10">
            <div className="flex justify-between px-5 items-center">
              <h2 className="text-lg font-bold">Ultimas transferências</h2>
              <span>Ver mais</span>
            </div>

            <CardTransactions
              transactions={filterRecentTransactions}
              userData={userData}
            />
          </div>
        </div>
      </main>
    </>
  )
}
