import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '../../Components/CustomButton/custombutton'; 

const ConfirmationModal = ({ showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Application Submitted</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your application has been submitted successfully. You will be notified once the certificate is ready.
      </Modal.Body>
      <Modal.Footer>
        <CustomButton style={{ width: "50%" }} onClick={() => setShowModal(false)}>
          Close
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
