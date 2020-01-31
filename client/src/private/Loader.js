import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PrivateHeader from './PrivateHeader'


const Loader = () => {

  const dispatch = useDispatch()
  const handleClose = () => dispatch({ type: 'hideModal' })
  const [filename, setFilename] = useState('')

  const [isError, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'hideModal' })
    setError(false)

    try {
      const ret = await fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify(),
        headers: {
          'Content-Type': 'application/json'
          // 'Authorization': localStorage.getItem('token') // Esto en todas las llamadas autenticadas
        }
      })
      const data = await ret.json()
      localStorage.setItem('token', data.token) // Esto solo en login, para guardar el token

    } catch (err) {
      console.warn('Error:', err)
      setError(true)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className='modalHeading'>Introduzca el archivo .csv con los datos de los participantes</h3>
      <div className="loader">
        <label for="file">Subir archivo</label>
        <input id="file" name="file" type="file" required value={filename} onChange={setFilename} />
        <button className="initSesion">Crear buscador</button>

        <button onClick={handleClose}>Cancelar</button>

      </div>
      {isError && <div>Error, por favor inténtelo de nuevo</div>}
    </form >
  )
}

export default Loader