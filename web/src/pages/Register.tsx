import axios from 'axios'
import { Eye, EyeSlash, Lock, User } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export function Register() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalidPassword, setIsInvalidPassword] = useState(false)
  const [errorRegistering, setErrorRegistering] = useState('')
  const [visibledPassword, setVisibledPassword] = useState(false)

  const regexPass = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/

  useEffect(() => {
    if (isInvalidPassword) {
      setIsInvalidPassword(false)
    }
    setErrorRegistering('')
  }, [username, password])

  async function habdleSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    if (!regexPass.test(password)) {
      setIsInvalidPassword(true)
    } else {
      axios
        .post('http://localhost:3001/register', {
          username,
          password,
        })
        .then(() => {
          history.push('/login')
          alert('Usuário cadastrado com sucesso!')
        })
        .catch((err) => {
          setErrorRegistering(err.response.data.message)
        })
    }
  }

  return (
    <div className="flex w-full md:px-40 px-10 h-screen justify-center items-center flex-col bg-bg-animation bg-cover">
      <h1 className="text-white font-bold pb-10 md:text-3xl text-xl">
        Crie uma conta grátis!
      </h1>
      <form
        onSubmit={habdleSubmitForm}
        className="flex flex-col gap-5 md:w-[300px]"
      >
        <label
          htmlFor="username"
          className="text-white flex flex-col w-full relative"
        >
          Usuário
          <input
            type="text"
            className="p-2 pl-9 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black"
            name="username"
            required
            min={3}
            placeholder="Digite seu usuário"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            id="username"
          />
          <User className="absolute left-2 top-9 text-black/70" />
          {username.length > 0 && username.length < 3 && (
            <p className="text-red-500 text-sm pt-2">
              Seu usuário deve conter mais de 3 caracteres
            </p>
          )}
        </label>

        <label
          htmlFor="password"
          className="text-white flex flex-col w-full relative"
        >
          Senha
          <input
            type={visibledPassword ? 'text' : 'password'}
            name="password"
            required
            placeholder="Digite sua senha"
            className="p-2 pl-9 rounded-md placeholder-gray-900 placeholder:opacity-60 text-black"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
          <Lock
            size={20}
            weight="thin"
            className="absolute left-2 top-9 text-black/70"
          />
          {visibledPassword ? (
            <EyeSlash
              weight="thin"
              size={20}
              className="absolute right-2 top-9 text-black/70 cursor-pointer"
              onClick={() => setVisibledPassword(false)}
            />
          ) : (
            <Eye
              weight="thin"
              size={20}
              className="absolute right-2 top-9 text-black/70 cursor-pointer"
              onClick={() => setVisibledPassword(true)}
            />
          )}
          {isInvalidPassword && (
            <p className="text-red-500 text-sm pt-2">
              A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e
              um número.
            </p>
          )}
        </label>
        {errorRegistering && (
          <p className="text-red-500 text-sm pt-2">{errorRegistering}</p>
        )}
        <button
          type="submit"
          disabled={username.length < 3 || password.length < 8}
          className="bg-zinc-300 hover:bg-zinc-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded-md font-medium"
        >
          Criar uma conta
        </button>
        <p className="text-white">
          Já possui uma conta?
          <Link to="/login" className="text-blue-600 pl-1">
            Faça seu login
          </Link>
        </p>
      </form>
    </div>
  )
}
