import PixIcon from '@mui/icons-material/Pix';
import { ChartBar, CreditCard, Eye, EyeSlash } from 'phosphor-react';
import { useContext, useState } from 'react';
import { AsideMenu } from '../components/AsideMenu';
import { Header } from '../components/Header';
import { bankingContext } from '../context/BankingContext';
import { IUserLogin } from '../interfaces/IUser';

export function Home() {
  const { balance } = useContext(bankingContext);
  const [visibledBalance, setVisibledBalance] = useState(false);

  const userData = JSON.parse(
    localStorage.getItem('user') as string,
  ) as IUserLogin;

  return (
    <>
      <Header />
      <main className='text-white w-full flex'>
        <AsideMenu />
        <div className='flex flex-col px-20'>
          <div className='flex mt-10 gap-20'>
            <div className='w-[450px] bg-zinc-300 py-14 px-20 rounded-md gap-5 flex flex-col'>
              <p className='font-semibold text-2xl text-black'>
                Olá, {userData && userData.username}
              </p>
              <div className='flex flex-col'>
                <p className='text-zinc-800 opacity-80 text-sm flex gap-2 items-center'>
                  Seu saldo atual é
                  {visibledBalance ? (
                    <EyeSlash weight='thin' size={20} className='text-black/70 cursor-pointer' onClick={() => setVisibledBalance(false)} />
                  ) : (
                    <Eye weight='thin' size={20} className='text-black/70 cursor-pointer' onClick={() => setVisibledBalance(true)} />
                  )}
                </p>
                <span className='text-2xl text-black font-semibold'>
                  {!visibledBalance ? '*****' : balance === null
                    ? 'Não foi possível carregar seu saldo'
                    : `R$ ${(balance / 100).toFixed(2).split('.').join(',')}`}
                </span>
              </div>
            </div>

            <div className='flex gap-5'>
              <button className='bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black'>
                <PixIcon fontSize='large' />
              </button>

              <div className='bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black'>
                <ChartBar size={35} weight="fill" />
              </div>

              <div className='bg-zinc-300 rounded-full h-20 w-20 flex items-center justify-center text-black'>
                <CreditCard size={35} weight="fill" />
              </div>
              
            </div>
          </div>


        </div>
      </main>
    </>
  );
}
