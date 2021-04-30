/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import DeleteSongButton from './DeleteSongButton';

/*************************** COMPONENTS ***************************/

function DeleteModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='deleteModalButton' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSongButton id={id} onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default DeleteModal;