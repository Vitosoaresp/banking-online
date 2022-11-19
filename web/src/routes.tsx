import { Redirect, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Transactions } from './pages/Transactions'

export function Routes() {
  return (
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/transactions">
        <Transactions />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}
