// ** Reactstrap
import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";


// ** Third libs
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { toast } from "react-hot-toast";


// ** Apis
import { folderApi } from "../../../@core/api/quiz/folderApi";
const EditFolderModal = ({
  setFolders,
  setData,
  isEditModalOpen,
  editFolder, 
  setIsEditModalOpen
}) => {

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const toggle = () => setIsEditModalOpen(!isEditModalOpen);


  // ** Schema
  const Schema = yup.object().shape({
    title: yup
      .string()
      .test("isDuplicated", t("validationMessage.duplicated", { field: t("fieldName.title") }), async (value) => {
        //Khong check voi title hien tai cua folder
        if(editFolder.title === value){
          return true;
        }
        //Check voi tat title cua cac folder con lai
        const existingFoldersResponse = await folderApi.getAllFolders();
        const existingFolders = existingFoldersResponse.data.allFolder;
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

  // ** Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: {
      title: editFolder?.title,
      description: editFolder?.description,
    },
  });
  useEffect(() => {
    reset({
      title: editFolder?.title,
      description: editFolder?.description,
    });
  }, [editFolder, reset]);


  const onSubmit = (data) => {

    const body = {
       id: editFolder._id,
      title: data.title.trim(),
      description:
        data.description.trim() === "" ? null : data.description.trim(),
    };
    setLoading(true);
    folderApi
      .updateFolder(body)
      .then(({ data }) => {
          const folderUpdated = data.data.folder;
          console.log(folderUpdated);
          setData((prev) => {
            return prev.map((ss) =>
              ss._id === folderUpdated._id
                ? {
                    ...ss,
                    title: folderUpdated.title,
                    description: folderUpdated.description,
                  }
                : ss
            );
          });

          toast.success(
            t("message.updateSuccess", { value: t("fieldName.folder") }),
            {
              duration: 3000,
            }
          );

           setIsEditModalOpen(false);
        
      })
      
      .catch((err) => {
        toast.error(t("error.unknow"), { duration: 3000 });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
      
  };
  const handleCancel = () => {
    setIsEditModalOpen(!isEditModalOpen);


  };

  
  return (
    <Modal
      className="modal-dialog-centered modal-lg"
      isOpen={isEditModalOpen}
    >
      <ModalHeader toggle={toggle}>
        {t("fieldName.edit")}
      </ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="mb-1">
            <Label className="form-label" for="description">
              {t("fieldName.id")}
            </Label>
            <Input value={editFolder?._id} disabled />
          </div>
          <div className="mb-1">
            <Label
              className="form-label"
              for="title"
              style={{ color: errors.title && "#ea5455" }}
            >
              {t("fieldName.title")}
              <span style={{ color: "red", marginLeft: ".25rem" }}>*</span>
            </Label>
            <Controller
              id="title"
              name="title"
              defaultValue={editFolder?.title}
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder={t("common.placeholder.createFolderTitle")}
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.title.message}
              </FormFeedback>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="description">
              {t("fieldName.description")}
            </Label>
            <Controller
              id="description"
              name="description"
              defaultValue={editFolder?.description}
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  placeholder={t(
                    "common.placeholder.createFolderDescription"
                  )}
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.description.message}
              </FormFeedback>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple
            color="secondary"
            type="button"
            onClick={handleCancel}
            disabled={loading}
          >
            {t("fieldName.cancel")}
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit" disabled={loading}>
            {loading && <Spinner color="white" size="sm" />}
            <span className={classNames({ "ms-50": loading })}>
              {t("fieldName.save")}
            </span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default EditFolderModal;
