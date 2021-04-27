/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

/*************************** COMPONENTS ***************************/

function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='modalButton' onClick={() => setShowModal(true)}>Signup</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default SignupModal;