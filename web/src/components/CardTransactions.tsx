import { useContext } from 'react'
import { bankingContext } from '../context/BankingContext'
import { ITransactions } from '../interfaces/ITransfer'
import { IUserLogin } from '../interfaces/IUser'

interface ICardTransactionsProps {
  transactions: ITransactions[]
  userData: IUserLogin
}

export function CardTransactions({
  transactions,
  userData,
}: ICardTransactionsProps) {
  const { users } = useContext(bankingContext)
  return (
    <>
      {transactions.length < 1 && (
        <p className="flex justify-center py-20 px-5 text-xl font-semibold">
          Você não realizou/recebeu nenhuma transação ainda!
        </p>
      )}
      {transactions.map(
        ({ id, createdAt, debitedAccountId, creditedAccountId, value }) => (
          <div
            key={id}
            className="flex md:gap-5 gap-2 mt-5 bg-[#1f1f1f] py-4 md:px-6 px-2 rounded-md"
          >
            <div className="flex justify-center items-center px-4 py-1 bg-zinc-300 rounded-3xl">
              <span className="text-3xl font-bold text-black">
                {users
                  .find((user) =>
                    userData.id === debitedAccountId
                      ? user.id === creditedAccountId
                      : user.id === debitedAccountId,
                  )
                  ?.username[0].toLocaleLowerCase()}
              </span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <p className="font-semibold text-base">
                  {
                    users.find((user) =>
                      userData.id === debitedAccountId
                        ? user.id === creditedAccountId
                        : user.id === debitedAccountId,
                    )?.username
                  }
                </p>
                <span className="text-sm text-zinc-300">
                  {new Date(createdAt).toLocaleDateString()} -{' '}
                  {new Date(createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p
                className={`${
                  userData.id === debitedAccountId
                    ? 'text-red-500'
                    : 'text-emerald-700'
                }`}
              >
                {userData.id === debitedAccountId && '-'} R${' '}
                {(value / 100).toFixed(2).split('.').join(',')}
              </p>
            </div>
          </div>
        ),
      )}
    </>
  )
}
