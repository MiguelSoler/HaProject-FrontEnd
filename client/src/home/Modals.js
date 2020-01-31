import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Event from '../private/Event'
import Loader from '../private/Loader'
import './Modals.css'

const Modals = () => {
  const dispatch = useDispatch()
  const currentModal = useSelector(s => s.modal)
  if (!currentModal) return false
  
  const handleClose = () => dispatch({ type: 'hideModal' })
  const handleClick = (e) => e.stopPropagation()

  let Modal
  if (currentModal.type === 'signin') Modal = SignIn
  if (currentModal.type === 'signup') Modal = SignUp
  if (currentModal.type === 'event') Modal = Event
  if (currentModal.type === 'loader') Modal = Loader



  return (
    <div className="modal-background" onClick={handleClose}>
      <div className="modal-foreground" onClick={handleClick}>
          <div className="signin-form">
            <Modal />
          </div>
      </div>
    </div>
  )
}

export default Modals



