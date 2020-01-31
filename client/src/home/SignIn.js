import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const history = useHistory()
  const handleSignUp = () => dispatch({ type: 'showModal', modalType: 'signup' })
  const handleClose = () => dispatch({ type: 'hideModal' })
  const [isError, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginData = { email, password }

    dispatch({ type: 'hideModal' })
    setError(false)
    try {
      const ret = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const {user, token} = await ret.json()
      dispatch({type: 'login', user, token})
      history.push('/private')

      //localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
    /*login({
      name,
      surname,
      token
    })*/
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className='modalHeading'>Iniciar sesión</h3>
      <div className="form-field">
        <label className="fields" for='email'>Email:</label>
        <input
          id='email'
          type='email'
          name="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label for='pass'>Password:</label>
        <input
          id='pass'
          name="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <p>Si todavía no está registrado pulse <Link to='/register' onClick={handleSignUp}>aquí</Link></p>

      <div className="buttonsContainer">
        <button className="initSesion">Inicia Sesión</button>
        <button onClick={handleClose}>Cancelar</button>
      </div>
      {isError && <div>Error, por favor inténtelo de nuevo</div>}
    </form>
  )
}

export default SignIn