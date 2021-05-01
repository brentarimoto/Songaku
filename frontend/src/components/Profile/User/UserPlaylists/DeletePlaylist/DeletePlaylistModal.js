/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../../../context/Modal';
import DeletePlaylistButton from './DeletePlaylistButton';
import styles from './DeletePlaylistButton.module.css'

/*************************** COMPONENTS ***************************/

function DeletePlaylistModal({name, id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className={`deletePlaylistModalButton fas fa-minus ${styles.deleteIcon}`} onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaylistButton id={id} name={name} onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default DeletePlaylistModal;