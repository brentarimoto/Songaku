/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../context/Modal';
import UploadForm from './UploadForm';

/*************************** COMPONENTS ***************************/

function UploadModal() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('')
  const [album, setAlbum] = useState('')
  const [music, setMusic] = useState(null)
  const [image, setImage] = useState(null)

  return (
    <>
      <button className='modalButton' onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadForm
            title={title}
            setTitle={setTitle}
            title={title}
            album={album}
            setAlbum={setAlbum}
            music={music}
            setMusic={setMusic}
            image={image}
            setImage={setImage}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default UploadModal;