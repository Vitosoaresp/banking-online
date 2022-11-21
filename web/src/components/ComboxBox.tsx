import { Combobox, Transition } from '@headlessui/react'
import { CaretDown, Check } from 'phosphor-react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { IUser } from '../interfaces/IUser'

interface IComboboxProps {
  users: IUser[]
  selectedUserCashIn: string
  setSelectedUserCashIn: Dispatch<SetStateAction<string>>
}

export function ComboBox({
  selectedUserCashIn,
  setSelectedUserCashIn,
  users,
}: IComboboxProps) {
  const [queryPerson, setQueryPerson] = useState('')

  const userLoggedData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUser

  const usersCanTransfer = users.filter((user) => user.id !== userLoggedData.id)

  const filteredUser =
    queryPerson === ''
      ? usersCanTransfer
      : usersCanTransfer.filter((user) =>
          user.username
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(user.username.toLowerCase().replace(/\s+/g, '')),
        )

  return (
    <Combobox value={selectedUserCashIn} onChange={setSelectedUserCashIn}>
      <div className="relative w-full bg-black text-zinc-300 rounded-md">
        <div className='relative w-full cursor-default overflow-hidden rounded-md bg-black  text-left text-zinc-200 shadow-md focus:outline-none"'>
          <Combobox.Input
            value={queryPerson}
            onChange={(e) => setQueryPerson(e.target.value)}
            displayValue={(user: number) =>
              users.find((u) => u.id === user)?.username || ''
            }
            className="w-full border-none py-4 pl-6 pr-10 text-base leading-5 text-zinc-200 bg-black rounded-md"
          />

          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQueryPerson('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black text-zinc-200 py-1 text-base shadow-lg z-20">
            {filteredUser.map((user) => (
              <Combobox.Option
                key={user.id}
                value={user.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-zinc-300 text-black' : 'text-zinc-300'
                  }`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {user.username}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-black' : 'text-zinc-300'
                        }`}
                      >
                        <Check
                          className="h-5 w-5"
                          color="green"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
