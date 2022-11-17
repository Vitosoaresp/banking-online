import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';

export function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}