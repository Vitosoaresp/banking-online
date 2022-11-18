import { Bell, UserCircle } from 'phosphor-react';

export function Header() {
  return (
    <header className='w-full flex justify-end items-center bg-zinc-900 py-4 px-14 gap-10'>
      <Bell size={30} weight="regular" color="white" />
      <UserCircle size={30} weight="regular" color="white" />
    </header>
  )
}