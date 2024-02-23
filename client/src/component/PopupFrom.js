import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalFooter from 'react-bootstrap/esm/ModalFooter';
import './PopupForm.css'



function PopupForm(){

    const  [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return(
        <>
            <Button variant='success' className='Popup-btn' onClick={handleShow}>Contact Us</Button>

            <Modal show= {showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2 className='modal-title text-center'>Contact Us</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <div>
                            <h3>Hello World</h3>
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant= 'success' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default PopupForm;