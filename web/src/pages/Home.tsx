import { useContext } from 'react';
import { AsideMenu } from '../components/AsideMenu';
import { Header } from '../components/Header';
import { bankingContext } from '../context/BankingContext';
import { IUserLogin } from '../interfaces/IUser';

export function Home() {
  const { balance } = useContext(bankingContext);

  const userData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUserLogin;

  return (
    <>
      <Header />
      <main className='text-white w-full flex'>
        <AsideMenu />
        <div className='flex flex-col px-20'>
          <div className='w-[450px] bg-zinc-300 py-14 px-20 rounded-md mt-10 gap-5 flex flex-col'>
            <p className='font-semibold text-2xl text-black'>
              Olá, {userData && userData.username}
            </p>
            <div className='flex flex-col'>
              <p className='text-zinc-800 opacity-80 text-sm'>
                Seu saldo atual é
              </p>
              <span className='text-2xl text-black font-semibold'>
                {balance === null
                  ? 'Não foi possível carregar seu saldo'
                  : `R$ ${(balance / 100).toFixed(2).split('.').join(',')}`}
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
