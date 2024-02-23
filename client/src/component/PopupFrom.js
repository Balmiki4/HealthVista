import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/esm/ModalFooter";
import "./PopupForm.css";

function PopupForm() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Button variant="success" className="Popup-btn" onClick={handleShow}>
        Contact Us
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal-title text-center">Contact Us</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {
            <form action="https://formspree.io/f/(FORMSPREEHASH)" method="POST">
              <div class="mb-3">
                <label for="name">Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  required
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email address:
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                ></input>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label">
                Message:
                </label>
                <textarea
                  class="form-control"
                  id="message"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-outline-success">
                Send Message
              </button>
            </form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupForm;
