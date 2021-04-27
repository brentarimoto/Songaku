/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import EditForm from './EditForm';

/*************************** COMPONENTS ***************************/

function EditModal({song}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='editModalButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditForm song={song} onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default EditModal;