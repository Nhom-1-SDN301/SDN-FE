// MyModal.js

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody } from 'reactstrap';
import { studySetApi } from '../../../@core/api/quiz';
import { folderApi } from '../../../@core/api/quiz/folderApi';

const ModalAddStudySetToFolder = ({ isOpen, onClose, folderId, isUpdated }) => {
  const { t } = useTranslation();
  const [isAdded, setIsAdded] = useState([]);
  const [studySets, setStudySets] = useState(null);
  const [loadingStudySet, setLoadingStudySet] = useState(false);

  // const handleAddRemoveClick = (index, studySetId) => {
  //   const newIsAdded = [...isAdded];
  //   newIsAdded[index] = !newIsAdded[index];
  //   setIsAdded(newIsAdded);
  //   console.log(folderId);
  //   console.log(studySetId);
  //   folderApi.addStudySetToFolder(folderId, studySetId)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => { console.log("err", err); });
  //   folderApi.deleteStudySetFromFolder(folderId, studySetId)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log("err", err);
  //   })
  // };

  const handleAddRemoveClick = (index, studySetId) => {
    const newIsAdded = [...isAdded];
    newIsAdded[index] = !newIsAdded[index];
    setIsAdded(newIsAdded);
    
    if (newIsAdded[index]) {
      folderApi.addStudySetToFolder(folderId, studySetId)
        .then(res => {
          console.log(res);
          isUpdated("Update Successully")
        })
        .catch(err => {
          console.log("err", err);
          isUpdated("Update Fail")
        });
    } else {
      folderApi.deleteStudySetFromFolder(folderId, studySetId)
        .then(res => {
          console.log(res);
          isUpdated("Update Successully")
        })
        .catch(err => {
          console.log("err", err);
          isUpdated("Update Fail")
        });
    }
  };
  

  useEffect(() => {
    studySetApi.getAllStudySetByUserId()
      .then((res) => {
        const studySetsData = res.data.data.studySet.studySets;
        setStudySets(studySetsData);
  
        folderApi.getStudySetByFolderId(folderId)
          .then((res) => {
            const studySetsInFolder = res.data.data.studySets;
              const initialIsAdded = studySetsData.map((studySet) => {
                let found = false;
                for (const folderStudySet of studySetsInFolder) {
                  if (folderStudySet._id === studySet._id) {
                    found = true;
                    break;
                  }
                }
                return found;
              });
  
              setIsAdded(initialIsAdded);
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingStudySet(false);
      });
  }, [folderId]);
  
  

  return (
    <Modal isOpen={isOpen} toggle={onClose}>
      <ModalHeader>{t("fieldName.addStudySet")}</ModalHeader>
      <ModalBody>
        {studySets &&
          studySets.map((studySets, index) => (
            <Card key={studySets.id}>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center">
                  <h5>{studySets.title}</h5>
                  <Button color={isAdded[index] ? 'warning' : 'primary'} onClick={() => handleAddRemoveClick(index, studySets._id)}>
                    {isAdded[index] ? '-' : '+'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          {t("fieldName.close")}
        </Button>
      </ModalFooter>
    </Modal>
  )
};

export default ModalAddStudySetToFolder;
