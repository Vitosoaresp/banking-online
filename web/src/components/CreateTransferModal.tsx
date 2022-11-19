import * as Dialog from '@radix-ui/react-dialog'
import { CircleNotch } from 'phosphor-react'
import { FormEvent, useContext, useState } from 'react'

import { bankingContext } from '../context/BankingContext'
import { IUserLogin } from '../interfaces/IUser'
import { fetchCreateTransfer } from '../services/fetchTransfer'
import { ComboBox } from './ComboxBox'

export function CreateTransferModal() {
  const { users, balance } = useContext(bankingContext)
  const [amount, setAmount] = useState(0)
  const [selectedUserCashIn, setSelectedUserCashIn] = useState('')
  const [errorTransferForBalance, setErrorTransferForBalance] = useState(false)
  const [isPromiseTransfer, setIsPromiseTransfer] = useState(false)

  const userLoggedData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUserLogin

  async function handleSumbitTransfer(e: FormEvent) {
    e.preventDefault()

    if (balance === null || amount * 100 > balance) {
      setErrorTransferForBalance(true)
      setTimeout(() => {
        setErrorTransferForBalance(false)
      }, 5000)
    } else {
      try {
        setIsPromiseTransfer(true)
        await fetchCreateTransfer({
          accountIn: Number(selectedUserCashIn),
          value: amount * 100,
          token: userLoggedData.token,
        })
        setIsPromiseTransfer(false)
        alert('Transferência realizada com sucesso!')
      } catch (error) {
        console.log(error)
        setIsPromiseTransfer(false)
        alert(
          'Não foi possível realizar a transferência, tente novamente mais tarde.',
        )
      }
    }
  }

  return (
    <Dialog.DialogPortal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-zinc-900 py-16 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[500px] w-[80vw] shadow-lg shadow-black/25">
        <form
          onSubmit={handleSumbitTransfer}
          className="flex flex-col gap-5 md:px-8 w-full"
        >
          <label
            htmlFor="usersForCashIn"
            className="flex flex-col text-zinc-200 font-medium gap-2 text-xl"
          >
            Para quem você quer transferir?
            <ComboBox
              users={users}
              selectedUserCashIn={selectedUserCashIn}
              setSelectedUserCashIn={setSelectedUserCashIn}
            />
          </label>

          <label
            htmlFor="amount"
            className="flex flex-col text-zinc-200 font-medium gap-2 text-xl"
          >
            Qual o valor da transferência?
            <input
              type="number"
              name="amount"
              value={amount.toFixed(2)}
              onChange={(e) => setAmount(Number(e.target.value))}
              id="amount"
              className="bg-black text-zinc-200 py-4 px-6 rounded-md outline-none"
            />
          </label>

          {errorTransferForBalance && (
            <p className="text-red-500">
              Você não tem saldo suficiente para realizar essa transferência.
            </p>
          )}

          <div className="flex w-full gap-5 items-center justify-between">
            <button
              disabled={
                selectedUserCashIn === '' || amount === 0.0 || isPromiseTransfer
              }
              className="bg-zinc-200 hover:bg-zinc-300 transition-colors text-zinc-900 py-4 px-6 rounded-md font-medium text-lg disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer w-36 flex items-center justify-center"
              type="submit"
            >
              {isPromiseTransfer ? (
                <CircleNotch size={20} className="animate-spin" />
              ) : (
                'Confirmar'
              )}
            </button>
            <Dialog.Close className="text-zinc-200 font-medium bg-red-600 hover:bg-red-700 transition-colors py-4 px-6 text-lg rounded-md w-36">
              Cancelar
            </Dialog.Close>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.DialogPortal>
  )
}
