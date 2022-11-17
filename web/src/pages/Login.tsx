import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-login.svg';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div className='flex md:flex-row flex-col items-center justify-center h-screen'>
      <div className='md:w-3/5 w-[300px] md:pt-0 pt-5 flex justify-center items-center'>
        <img src={ logo } alt="" />
      </div>
      <hr className='md:flex hidden w-[1px] h-screen bg-gray-400' />
      <div className='flex flex-col justify-center items-center w-2/5'>
        <h2 className='text-zinc-200 font-bold mb-10'>Faça seu login</h2>
        <form onSubmit={handleSubmitForm} className='flex flex-col gap-5'>
          <label htmlFor="username" className='text-white flex flex-col w-full'>
            Usuário
            <input
              type="text"
              className='p-2 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black'
              name="username"
              required
              placeholder='Digite seu usuário'
              value={ username }
              onChange={ event => setUsername(event.target.value) }
              id="username"
            />
          </label>
          <label htmlFor="password" className='text-white flex flex-col w-full'>
            Senha
            <input
              type="password"
              name="password"
              required
              placeholder='Digite sua senha'
              className='p-2 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black'
              value={ password }
              onChange={ event => setPassword(event.target.value) }
              id="password"
            />
          </label>
          <button type="submit" className='bg-zinc-600 hover:bg-zinc-700 transition-colors py-2 rounded-md font-medium'>Entrar</button>
          <p className='text-white'>
            Ainda não tem conta?
            <Link to="/register" className='text-blue-600 pl-1'>Crie agora</Link>
          </p>
        </form>
      </div>
    </div>
  )
} 