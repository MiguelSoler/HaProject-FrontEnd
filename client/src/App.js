import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import Modals from './home/Modals'
import generateStore from './reducers'
import Private from './private/Private'
import './App.css';


const Content = () => {
  const dispatch = useDispatch()
  const handleSignin = () => dispatch({ type: 'showModal', modalType: 'signin' })

  return (
    <>

      <div className="App">

        <header className="App-header">
          <h1 className='title'>RUN-RUN</h1>
        </header>
        <main className="App-main">
          <h2 className="subtitle">Bienvenido/a al Gestor de Dorsales</h2>
          <Link to="/login" className="entrar" onClick={handleSignin}>ENTRA!</Link>
          <Switch>
            <Route path="/login">
              <Modals />
            </Route>
            <Route path="/register">
              <Modals />
            </Route>
            <Route path="/private">
              <Private />
            </Route>
          </Switch>
          <footer>
            <p>©2020 por Dorsales Team para Hack a Boss </p>
          </footer>
        </main>

      </div>
    </>
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
  )
}

export default App;
