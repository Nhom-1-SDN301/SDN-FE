import React from 'react';
import styles from './folderStyle.module.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

const CreateFolderModal = ({ isOpen, toggle, createNewFolder }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: 800, top: 150  }}>
      <ModalHeader toggle={toggle}>Create New Folder</ModalHeader>
      <ModalBody>
        <div className={styles.name_folder}>
          <span >Title</span>
          <Input type='text' placeholder='Input title' />
        </div>
        <div className={styles.des_folder}>
          <span>Description(option)</span>
          <Input type='text' placeholder='Input description' />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={createNewFolder}>
          Create New Folder
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateFolderModal;
