import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modals from '../home/Modals'
import './Private.css';
import PrivateHeader from './PrivateHeader'
import Event from './Event'

const Private = () => {
  const dispatch = useDispatch()
  const handleEvent = () => dispatch({ type: 'showModal', modalType: 'event' })

  return (
    <div className="private">
      <header className="App-header">
        
      </header>
      <main className="App-main">
        <h2 className="subtitle">Bienvenido/a al Gestor de Dorsales</h2>
        <button className="btn-race">
          <Link to="/private/event" className="entrar" onClick={handleEvent}>Ya puedes crear una carrera</Link>
        </button>
        <Switch>
          <Route path="/private/event">
            <Modals />
          </Route>
          <Route path="/private/loader">
            <Modals/>
          </Route>
        </Switch>
        <button>Cerrar sesión</button>
        <footer>
          <p>©2020 por Dorsales Team para Hack a Boss </p>
        </footer>
      </main>

    </div>
  )
}

export default Private