// ValidationModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomButton from '../../Components/CustomButton/custombutton';

const ValidationModal = ({ showModal, setNicValidationModal }) => {
  return (
    <Modal show={showModal} onHide={() => setNicValidationModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Invalid NIC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The NIC number you submitted does not exist. Please input the correct NIC and resubmit.
      </Modal.Body>
      <Modal.Footer>
        <CustomButton style={{ width: "50%" }} onClick={() => setNicValidationModal(false)}>
          Close
        </CustomButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ValidationModal;
