import axios, { AxiosResponse } from 'axios'
import { Eye, EyeSlash, Lock, User } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { IUserLogin } from '../interfaces/IUser'

export function Login() {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalidLogin, setIsInvalidLogin] = useState(false)
  const [visibledPassword, setVisibledPassword] = useState(false)

  useEffect(() => {
    if (isInvalidLogin) {
      setIsInvalidLogin(false)
    }
  }, [username, password])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      history.push('/home')
    }
  }, [])

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    axios
      .post<unknown, AxiosResponse<IUserLogin>>('http://localhost:3001/login', {
        username,
        password,
      })
      .then((response) => {
        const { data } = response
        localStorage.setItem('user', JSON.stringify(data))
        history.push('/home')
      })
      .catch(() => {
        setIsInvalidLogin(true)
      })
  }

  return (
    <div className="flex md:flex-row flex-col items-center justify-center h-screen bg-login-animation bg-cover">
      <div className="flex flex-col justify-center items-center w-full px-10">
        <h2 className="text-zinc-200 font-bold mb-10 md:text-3xl text-lg">
          Faça seu login
        </h2>

        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-5 md:w-[450px] md:px-20 px-7"
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
              placeholder="Digite seu usuário"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              id="username"
            />
            <User className="absolute left-2 top-9 text-black/70" />
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
          </label>
          {isInvalidLogin && (
            <p className="text-red-500 text-md">Usuário ou senha inválidos</p>
          )}

          <button
            disabled={!username || !password}
            type="submit"
            className="bg-zinc-200 hover:bg-zinc-300 transition-colors py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Entrar
          </button>

          <p className="text-white">
            Ainda não tem conta?
            <Link to="/register" className="text-blue-600 pl-1">
              Crie agora
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
