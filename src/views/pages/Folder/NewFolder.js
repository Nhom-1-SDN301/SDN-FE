import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import React, {useCallback ,useEffect, useState } from 'react';
import * as yup from "yup";
import { Form } from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './folderStyle.module.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import { folderApi } from "../../../@core/api/quiz/folderApi";

const CreateFolderModal = ({ isOpen, toggle, setFolders, onModalClose = (close) }) => {
  const { t } = useTranslation();
  const limit = 5 ;
  const [search, setSearch] = useState('');
  const [offset, setOffSet] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const Schema = yup.object().shape({
    title: yup
      .string()
      .test("isDuplicated", t("validationMessage.duplicated", { field: t("fieldName.title") }), async (value) => {
        const existingFoldersResponse = await folderApi.getAllFolders();
        const existingFolders = existingFoldersResponse.data.allFolder;
        console.log(existingFolders);
        return !existingFolders.folders?.some((folder) => folder.title === value);
      })
      .max(100, t("validationMessage.maxLength", { field: t("fieldName.title"), value:100 }))
      .required(
        t("validationMessage.required", { field: t("fieldName.title") })
      ),
    description: yup
    .string()
    .max(250, t("validationMessage.maxLength", { field: t("fieldName.description"), value:250 }))
    .nullable(),
  });
  const { handleSubmit, formState: { errors }, control, reset } = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (formData) => {
    folderApi.createFolder(formData)
      .then(res => {
        folderApi.getAllFolder({ limit, offset, search })
          .then(res => {
            setFolders(res.data.allFolder.folders);
            setTotalPage(res.data?.data?.totalPage);

          })
        
          .catch(err => { console.log("err", err); });
      })
      .catch(err => { console.log("err", err); });

    reset();

    onModalClose(false);
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: 800, top: 150 }}>
      <ModalHeader toggle={toggle}>{t("fieldName.createNewFolder")}</ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className={errors.title ? `${styles.name_folder}` : ""}>
            <span >{t("fieldName.title")}<i class={styles.requiredInput}>*</i> </span>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    type='text'
                    placeholder={t("common.placeholder.createFolderTitle")}
                    className={errors.title ? `${styles.inputTitle}` : ""}
                    {...field}
                  />
                  {errors.title && (
                    <div style={{ color: "red", marginLeft: ".25rem" }}>{errors.title.message}</div>
                  )}
                </div>
              )}
            />
          </div>
          <div className={errors.description ? `${styles.des_folder}` : ""}>
            <span>{t("fieldName.description")}</span>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                <Input
                  type='text'
                  placeholder={t("common.placeholder.createFolderDescription")}
                  className={errors.description ? `${styles.inputDes}` : ""}
                  {...field}
                />
                {errors.description && (
                  <div style={{ color: "red", marginLeft: ".25rem" }}>{errors.description.message}</div>
                )}
                </div>
              )}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
            {t("fieldName.createNewFolder")}
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default CreateFolderModal;
