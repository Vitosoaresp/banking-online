import { AsideMenu } from '../components/AsideMenu';
import { Header } from '../components/Header';

export function Home() {
  return (
    <>
      <Header />
      <main className="text-white w-full flex">
        <AsideMenu />
        <div className="flex flex-col px-20">
          <div className="w-[450px] bg-zinc-900 py-14 px-20 rounded-md mt-10">
            <p>
              Olá, Vitor
            </p>
            <p>
              R$ 3.250,00
            </p>
          </div>
        </div>
      </main>
    </>
  )
}