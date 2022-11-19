import { useContext, useState } from 'react'

import { AsideMenu } from '../components/AsideMenu'
import { CardTransactions } from '../components/CardTransactions'
import { Header } from '../components/Header'
import { bankingContext } from '../context/BankingContext'

import { IUserLogin } from '../interfaces/IUser'

export function Transactions() {
  const { transactions } = useContext(bankingContext)
  const [selectLaunch, setSelectLaunch] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const userData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUserLogin

  const filterTransactionsByType = transactions.filter((transaction) => {
    if (selectLaunch === 'all') {
      return transaction
    } else if (selectLaunch === 'cashOut') {
      return transaction.debitedAccountId === userData.id
    } else {
      return transaction.debitedAccountId !== userData.id
    }
  })

  const convertDate = (dateString: string) => new Date(dateString).getTime()

  const filterTransactionsByDate = filterTransactionsByType.filter(
    (transaction) => {
      if (startDate === '' && endDate === '') {
        return transaction
      } else if (startDate !== '' && endDate === '') {
        return convertDate(transaction.createdAt) >= convertDate(startDate)
      } else if (endDate !== '' && startDate === '') {
        return convertDate(transaction.createdAt) <= convertDate(endDate)
      } else {
        return (
          convertDate(transaction.createdAt) >= convertDate(startDate) &&
          convertDate(transaction.createdAt) <= convertDate(endDate)
        )
      }
    },
  )

  return (
    <>
      <Header />
      <main className="text-white w-full flex">
        <AsideMenu />
        <div className="flex flex-col md:px-20 md:ml-[230px] px-5 py-10 w-full">
          <h2>Suas Transações</h2>
          <div className="flex gap-10">
            <button
              type="button"
              onClick={() => setSelectLaunch('all')}
              className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                selectLaunch === 'all'
                  ? 'bg-zinc-300 text-black'
                  : 'bg-[#1f1f1f] text-zinc-200'
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setSelectLaunch('cashOut')}
              className={`px-4 py-2 rounded-md  cursor-pointer transition-colors ${
                selectLaunch === 'cashOut'
                  ? 'bg-zinc-300 text-black'
                  : 'bg-[#1f1f1f] text-zinc-200'
              }`}
            >
              Enviadas
            </button>
            <button
              type="button"
              onClick={() => setSelectLaunch('cashIn')}
              className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${
                selectLaunch === 'cashIn'
                  ? 'bg-zinc-300 text-black'
                  : 'bg-[#1f1f1f] text-zinc-200'
              }`}
            >
              Recebidas
            </button>

            <input
              className="bg-[#1f1f1f] rounded-md text-zinc-200 px-4 py-2"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="dateOf"
              id="dateOf"
            />
            <input
              className="bg-[#1f1f1f] rounded-md text-zinc-200 px-4 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              name="dateUntil"
              id="dateUntil"
            />

            {/* <button type="button" className="" onClick={() => }>
              Filtrar
            </button> */}
          </div>
          <CardTransactions
            transactions={filterTransactionsByDate.reverse()}
            userData={userData}
          />
        </div>
      </main>
    </>
  )
}
