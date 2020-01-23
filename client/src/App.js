import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider, useSelector, useDispatch } from 'react-redux'
import LoginModal from './home/LoginModal'
import './App.css';
import generateStore from './reducers'
import Private from './private/Private'

const Content = () => {
  const dispatch = useDispatch()
  const user = useSelector(s => s.user)
  const handleLogin = () => dispatch({ type: 'showModal', modalType: 'login' })

  return (
    <div className="App">
      {user && <Private />}
      <header className="App-header">
        <h1>RUN-RUN</h1>

      </header>
      <main className="App-main">
        <h2>Bienvenido/a al Gestor de Dorsales</h2>
        <Link to="/login" onClick={handleLogin}><div className="enterbtn">ENTRA!</div></Link>
        <Switch>
          <Route path="/login">
            <LoginModal />
          </Route>
        </Switch>
      </main>

    </div>
  )
}

const store = generateStore()

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Content />
      </Router>
    </Provider>
  );
}

export default App;
