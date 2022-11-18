import { ChartLineUp, House, Receipt, SignOut } from 'phosphor-react';
import { Link, useHistory } from 'react-router-dom';

export function AsideMenu() {
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <aside className="w-[300px] h-screen px-12 bg-zinc-900 text-white hidden md:flex flex-col justify-between pb-24">
      <div className="flex flex-col gap-8 py-5">
        <Link
          className="bg-black/60 hover:bg-black/70 rounded-md py-2 px-6 flex justify-start gap-5 items-center"
          to="/home"
        >
          <House size={20} />
          Home
        </Link>
        <Link
          className="bg-black/60 hover:bg-black/70 rounded-md py-2 px-6 flex justify-start gap-5 items-center"
          to="/home/transferencias"
        >
          <Receipt size={20} />
          Transferencais
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

      <div className="flex flex-col gap-5 py-6">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-black/60 hover:bg-black/70 py-2 rounded-md flex justify-start gap-7 items-center px-6 text-zinc-200">
          <SignOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  )
}