import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Input, InputGroup, InputGroupText, Row, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Search, Plus } from 'react-feather';
import BreadCrumbsPage from '@components/breadcrumbs';
import CreateFolderModal from './NewFolder';
import EditFolderModal from './EditFolderModal';
import FolderCard from './ItemFolder';
import _ from "lodash";
import styles from './folderStyle.module.scss';
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { folderApi } from "../../../@core/api/quiz/folderApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactPaginate from 'react-paginate';



const Folder = (id, numberOfTerms, author, title, description) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showNewCard, setShowNewCard] = useState(false);
  const [folders, setFolders] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingFolder, setLoadingFolder] = useState(false)
  const MySwal = withReactContent(Swal);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  
  useEffect(() => {
    handleFetch(5, page, search);
  }, [page], [search]);

  const handleFetch = (limit, offset, search) => {
    setLoadingFolder(true);
    setFolders(() => []);

    folderApi.getAllFolder({ limit, offset, search })
      .then((res) => {
        setFolders(res.data?.allFolder.folders);
        setTotalPage(res.data?.allFolder.totalPage)
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingSearch(false);
        setLoadingFolder(false);
      })
  }

  const searchDebounce = useCallback(
    _.debounce((limit, offset, search) => {
      setLoadingSearch(true);
      setPage(0);
      handleFetch(limit, offset, search, true);
    }, 500),
    []
  );

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const createNewFolder = () => {
    setShowCreateModal(false);
    setShowNewCard(true);
  };

  const handleEdit = async (folder) => {
    setIsEditModalOpen(true);
    setEditFolder(folder);    
  };

  console.log("123",folders);

  const handleDelete = async (id) => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirmDelete"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then((result) => {
        if (result.value) {
          setLoadingDelete(true);
          return folderApi.deleteFolder({ folderId: id });
        }
      })
      .then((resp) => {
        if (resp) {
          const { data } = resp;
          if (data.isSuccess) {
            toast.success(
              t("message.deleteSuccess", { value: t("fieldName.folder") })
            );
            const updatedFolders = folders.filter((folder) => folder._id !== id);
            setFolders(updatedFolders);
          }
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };
  

  return (
    <div style={{ maxWidth: 1080 }}>
      <BreadCrumbsPage title={t('page.folder')} data={[{ title: t('page.folder') }]} />
      <Row className="my-3" xs={1} sm={1} md={2}>
        <Col style={{ marginTop: '-25px' }}>
          <Button.Ripple className={styles.width_button_auto} color="primary" onClick={openCreateModal}>
            <Plus size={14} />
            <span className="align-middle ms-25">{t("fieldName.create")}</span>
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
        setFolders={setFolders}
        onModalClose={close =>
          setShowCreateModal(!showCreateModal)
        }
      />
      <EditFolderModal
        isOpen={isEditModalOpen}
        isEditModalOpen={isEditModalOpen} 
        setData={setFolders}
        setIsEditModalOpen={setIsEditModalOpen}
        editFolder={editFolder}
        toggle={() => setIsEditModalOpen(!isEditModalOpen)}
        onModalClose={close =>
          setIsEditModalOpen(!isEditModalOpen)
        }
      />
      <FolderCard
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        folders={folders}
        
      />

      {/* )} */}
      <Row className="mt-2">
        <ReactPaginate
          nextLabel=""
          pageCount={totalPage}
          breakLabel="..."
          previousLabel=""
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          nextClassName="page-item next"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          previousClassName="page-item prev"
          containerClassName="pagination react-paginate justify-content-end"
          forcePage={page}
          onPageChange={(e) => setPage(e.selected)}
        />
      </Row>
    </div>
  );
};

export default Folder;
