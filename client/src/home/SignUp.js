import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const useFormField = () => {
  const [value, setValue] = useState('')
  return [value, e => setValue(e.target.value)]
}

const SignUp = () => {
  const dispatch = useDispatch()
  const [name, setName] = useFormField()
  const [surname, setSurname] = useFormField()
  const [email, setEmail] = useFormField()
  const [password, setPassword] = useFormField()
  const handleClose = () => dispatch({ type: 'hideModal' })

  const history = useHistory()
  const [isError, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    try {
      const newUser = { name, surname, email, password }
      const ret = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const {user, token} = await ret.json()
      dispatch({type: 'login', user, token})
      dispatch({ type: 'hideModal' })
      history.push('/private')


      //localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token
      //history.push(`/users/${data.id}`)
    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className='modalHeading'>Registrarse</h3>
      <div className="form-field">
        <label className="fields" for="name">Nombre:</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={setName}
        />
      </div>
      <div className="form-field">
        <label className="fields" for="surname">Apellidos:</label>
        <input
          id="surname"
          type="text"
          name="surname"
          required
          value={surname}
          onChange={setSurname}
        />
      </div>
      <div className="form-field">
        <label className="fields" for='email'>Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={setEmail}
        />
      </div>
      <div className="form-field">
        <label className="fields" for="pass">Password:</label>
        <input
          id="pass"
          type="password"
          name="password"
          required
          value={password}
          onChange={setPassword} />
      </div>
      <div className="buttonsContainer">
        <button className="registrate">Regístrate!</button>
        <button onClick={handleClose}>Cancelar</button>

      </div>
      {isError && <div>Error, por favor inténtelo de nuevo</div>}
    </form >
  )
}


export default SignUp