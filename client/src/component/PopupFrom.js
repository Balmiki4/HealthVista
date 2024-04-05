import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Popupform.css";

function PopupForm({
  buttonText,
  buttonClassName,
  buttonStyle = {},
  buttonType = "button",
}) {

  const formAction = `https://formspree.io/f/formfreehash`;
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const renderButton = () => {
    if (buttonType === "button") {
      return (
        <Button
          variant="success"
          className={buttonClassName}
          style={buttonStyle}
          onClick={handleShow}
        >
          {buttonText}
        </Button>
      );
    } else {
      return (
        <a
          href="#"
          className={buttonClassName}
          style={buttonStyle}
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          {buttonText}
        </a>
      );
    }
  };

  return (
    <>
      {renderButton()}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h2 className="modal-title text-center secondary-heading">{buttonText}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action={formAction} method="POST">
            <div className="mb-3">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address:
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message:
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-outline-success">
              Send Message
            </button>
          </form>
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