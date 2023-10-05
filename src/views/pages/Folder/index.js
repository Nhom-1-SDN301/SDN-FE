import React, { useState } from 'react';
import { Button, Col, Input, InputGroup, InputGroupText, Row, Spinner } from 'reactstrap';
import { Search, Plus } from 'react-feather';
import BreadCrumbsPage from '@components/breadcrumbs';
import CreateFolderModal from './NewFolder'; 
import FolderCard from './ItemFolder'; 
import styles from './folderStyle.module.scss';
import { useTranslation } from "react-i18next";


const Folder = (id, numberOfTerms, author, title, description) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const createNewFolder = () => {
    console.log('done');
    setShowCreateModal(false);
    setShowNewCard(true);
  };

  const handleDelete = () => {
    alert("Co muon xoa khong?");
  }

  return (
    <div style={{ maxWidth: 1080 }}>
      <BreadCrumbsPage title={t('page.folder')} data={[{ title: t('page.folder') }]} />
      <Row className="my-3" xs={1} sm={1} md={2}>
        <Col style={{ marginTop: '-25px' }}>
          <Button.Ripple className={styles.width_button_auto} color="primary" onClick={openCreateModal}>
            <Plus size={14} />
            <span className="align-middle ms-25">Create</span>
          </Button.Ripple>
        </Col>
        <Col style={{ marginTop: '-25px' }}>
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
            <Input
              placeholder={`${t('fieldName.search')}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchDebounce(5, page, e.target.value);
              }}
            />
            {loadingSearch && (
              <InputGroupText>
                <Spinner color="primary" style={{ width: 20, height: 20 }} />
              </InputGroupText>
            )}
          </InputGroup>
        </Col>
      </Row>
      <CreateFolderModal
        isOpen={showCreateModal}
        toggle={() => setShowCreateModal(!showCreateModal)}
        createNewFolder={createNewFolder}
      />

      {showNewCard && (
        <FolderCard
          handleDelete={handleDelete}
            
        />
      )}
    </div>
  );
};

export default Folder;
