import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PrivacyPolicy from './PrivacyPolicy';

import styles from './PrivacyPolicyButtonModal.module.scss';

function PrivacyPolicyButtonModal({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" className={styles.link} onClick={handleShow}>
        {children}
      </a>

      <Modal show={show} onHide={handleClose} dialogClassName={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.scrollable}>
            <PrivacyPolicy />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PrivacyPolicyButtonModal;
