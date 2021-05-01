/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../../context/Modal';
import AddPlaylistForm from './AddPlaylistForm';

import styles from './AddPlaylistForm.module.css'

/*************************** COMPONENTS ***************************/

function AddPlaylistModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i className={`addPlaylistModalButton fas fa-plus ${styles.addPlaylist}`} onClick={() => setShowModal(true)}></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPlaylistForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default AddPlaylistModal;