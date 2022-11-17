import axios from 'axios';
import { Lock, User } from 'phosphor-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    axios.post('http://localhost:3001/login', {
      username,
      password
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='flex md:flex-row flex-col items-center justify-center h-screen bg-login-animation bg-cover'>
      <div className='flex flex-col justify-center items-center w-full px-10'>
        <h2 className='text-zinc-200 font-bold mb-10'>Faça seu login</h2>
        <form onSubmit={handleSubmitForm} className='flex flex-col gap-5 md:w-[450px] md:px-20 px-7'>
          <label htmlFor="username" className='text-white flex flex-col w-full relative'>
            Usuário
            <input
              type="text"
              className='p-2 pl-7 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black'
              name="username"
              required
              placeholder='Digite seu usuário'
              value={ username }
              onChange={ event => setUsername(event.target.value) }
              id="username"
            />
          <User className='absolute left-2 top-9 text-black/70' />
          </label>
          <label htmlFor="password" className='text-white flex flex-col w-full relative'>
            Senha
            <input
              type="password"
              name="password"
              required
              placeholder='Digite sua senha'
              className='p-2 pl-7 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black'
              value={ password }
              onChange={ event => setPassword(event.target.value) }
              id="password"
            />
            <Lock className='absolute left-2 top-9 text-black/70' />
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