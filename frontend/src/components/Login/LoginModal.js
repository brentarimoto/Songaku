/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

/*************************** COMPONENTS ***************************/

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='modalButton' onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default LoginFormModal;