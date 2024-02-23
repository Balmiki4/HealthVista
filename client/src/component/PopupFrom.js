import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';


function PopupForm(){

    const  [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return(
        <>
            <Button variant='success' className='Popup-btn' onClick={handleShow}>Contact Us</Button>

            <Modal show= {showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Us Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <div>
                            <h3>Hello World</h3>
                        </div>
                    }
                </Modal.Body>
                <ModalFooter>
                    <Button varinat= 'secondary' onClick={handleClose}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );

}

export default PopupForm;