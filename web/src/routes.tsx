import { Redirect, Route, Switch } from 'react-router-dom';

export function Routes() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <h1>login</h1>
      </Route>
    </Switch>
  )
}