import { ChartLineUp, House, Receipt, SignOut } from 'phosphor-react'
import { Link, useHistory } from 'react-router-dom'

export function AsideMenu() {
  const history = useHistory()

  function handleLogout() {
    localStorage.clear()
    history.push('/login')
  }

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 px-11 py-10 bg-zinc-900 text-white hidden md:flex flex-col justify-between">
      <div className="flex flex-col gap-8 py-5">
        <Link
          className={`bg-black/60 rounded-md py-2 px-6 flex justify-start gap-5 items-center ${
            history.location.pathname === '/home'
              ? 'text-zinc-900 bg-zinc-200'
              : 'hover:text-zinc-900 hover:bg-zinc-200'
          } transition-colors duration-500 ease-in-out`}
          to="/home"
        >
          <House size={20} />
          Home
        </Link>
        <Link
          className={`bg-black/60 rounded-md py-2 px-6 flex justify-start gap-5 items-center ${
            history.location.pathname === '/transactions'
              ? 'text-zinc-900 bg-zinc-200'
              : 'hover:text-zinc-900 hover:bg-zinc-200'
          } transition-colors duration-500 ease-in-out`}
          to="/transactions"
        >
          <Receipt size={20} />
          Transferências
        </Link>
        <button
          type="button"
          disabled
          className="bg-black/60 hover:bg-black/70 opacity-60 rounded-md py-2 px-6 flex justify-start items-center gap-5 cursor-not-allowed"
        >
          <ChartLineUp size={20} />
          Investimentos
        </button>
      </div>

      <div className="flex flex-col gap-5 py-2">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-black/60 hover:bg-zinc-200 hover:text-zinc-900 transition-colors py-2 rounded-md flex justify-start gap-7 items-center px-6 text-zinc-200 duration-500 ease-in-out"
        >
          <SignOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  )
}
