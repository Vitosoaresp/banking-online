/* eslint-disable no-octal */
import { ArrowLeft } from 'phosphor-react'
import { useContext, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { AsideMenu } from '../components/AsideMenu'
import { CardTransactions } from '../components/CardTransactions'
import { Header } from '../components/Header'
import { bankingContext } from '../context/BankingContext'

import { IUserLogin } from '../interfaces/IUser'

export function Transactions() {
  const history = useHistory()
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.setHours(0, 0, 0, 0)
  }

  const newStartDate = useMemo(
    () => (startDate ? formatDate(startDate.replace(/-/g, '/')) : ''),
    [startDate],
  )

  const newEndDate = useMemo(
    () => (endDate ? formatDate(endDate.replace(/-/g, '/')) : ''),
    [endDate],
  )

  const filterTransactionsByDate = filterTransactionsByType.filter(
    (transaction) => {
      const newTransactioDate = formatDate(transaction.createdAt)
      if (startDate && endDate) {
        return (
          newTransactioDate >= newStartDate && newTransactioDate <= newEndDate
        )
      }

      if (startDate) {
        return newTransactioDate >= newStartDate
      }

      if (endDate) {
        return newTransactioDate <= newEndDate
      }

      return true
    },
  )

  return (
    <>
      <Header />
      <main className="text-white w-full flex">
        <AsideMenu />
        <div className="flex flex-col md:px-20 md:ml-[230px] px-5 py-10 w-full">
          <h2 className="md:text-2xl text-lg font-bold pb-10 flex items-center">
            <button
              className="md:hidden flex pr-2"
              onClick={() => history.push('/home')}
            >
              <ArrowLeft size={32} color="white" />
            </button>
            Suas transferências
          </h2>
          <div className="relative">
            <div className="flex gap-10 overflow-x-auto scroll-smooth">
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

              <label htmlFor="startDate">
                <input
                  className="bg-[#1f1f1f] rounded-md text-zinc-200 px-4 py-2"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  name="startDate"
                  id="startDate"
                />
              </label>
              <label htmlFor="endDate">
                <input
                  className="bg-[#1f1f1f] rounded-md text-zinc-200 px-4 py-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  name="endDate"
                  id="endDate"
                />
              </label>
            </div>
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
