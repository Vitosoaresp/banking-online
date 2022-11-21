import { Popover } from '@headlessui/react'
import { Bell, UserCircle } from 'phosphor-react'
import { useHistory } from 'react-router-dom'

export function Header() {
  const history = useHistory()

  function handleLogout() {
    localStorage.clear()
    history.push('/login')
  }

  return (
    <header className="w-full flex justify-end items-center bg-zinc-900 py-4 md:px-14 px-5 gap-10">
      <button className="cursor-not-allowed">
        <Bell size={30} weight="fill" color="white" className="pb-1" />
      </button>
      <Popover>
        <Popover.Button>
          <UserCircle size={30} weight="fill" color="white" />
        </Popover.Button>

        <Popover.Panel className="absolute right-0 w-[250px] bg-zinc-900 border border-zinc-800 rounded-md shadow-lg flex flex-col py-4 px-8 z-20">
          <div className="flex justify-center text-white font-semibold text-lg">
            Editar Perfil
          </div>
          <div className="py-2">
            <p className="flex cursor-not-allowed gap-1 text-md items-center justify-between text-zinc-400">
              Editar Imagem{' '}
              <span className="text-xs text-red-600">em breve</span>
            </p>
          </div>
          <hr className="w-full py-2" />
          <button
            className="py-2 px-4 rounded-md bg-zinc-200 hover:bg-zinc-300 transition-colors text-zinc-800 font-bold"
            onClick={handleLogout}
          >
            Sair
          </button>
        </Popover.Panel>
      </Popover>
    </header>
  )
}
