import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export function Register() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);

  const regexPass = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/

  async function habdleSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    setIsInvalidPassword(false)
    setIsInvalidUsername(false)
    if (!regexPass.test(password)) {
      setIsInvalidPassword(true);
    } else {
      axios.post('http://localhost:3001/register', {
        username,
        password,
      }).then(() => {
        history.push('/login');
      }).catch(error => {
        console.log(error);
        setIsInvalidUsername(true);
      });
    }
  }

  return (
    <div className='flex w-full md:px-40 px-10 h-screen justify-center items-center flex-col bg-bg-animation bg-cover'>
      <h1 className='text-white font-bold pb-10'>Crie uma conta grátis!</h1>
      <form onSubmit={habdleSubmitForm} className='flex flex-col gap-5 md:w-[300px]'>
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
            { isInvalidPassword && <p className='text-red-500 text-sm pt-2'>A sua senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.</p> }
          </label>
          { isInvalidUsername && <p className='text-red-500 text-sm pt-2'>Usuário já cadastrado.</p> }
          <button type="submit" className='bg-zinc-600 hover:bg-zinc-700 transition-colors py-2 rounded-md font-medium'>Criar uma conta</button>
          <p className='text-white'>
            Já possui uma conta?
            <Link to="/login" className='text-blue-600 pl-1'>Faça seu login</Link>
          </p>
        </form>
    </div>
  )
}