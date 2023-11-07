// ** React
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Input, Label, Row } from "reactstrap";
import { useCallback, useEffect, useState } from "react";

// ** Utils
import { useSkin } from "../../../utility/hooks/useSkin";

// ** Icons
import { Plus, Trash, X } from "react-feather";

// ** Components import
import BreadCrumbsPage from "@components/breadcrumbs";

// ** Third libs
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

// Styles
import styles from "./style.module.scss";

// ** Apis
import { studySetApi, termApi } from "../../../@core/api/quiz";
import PageLoading from "../../../@core/components/page-loading";

const EditTerm = () => {
  // ** Hooks
  const { studySetId } = useParams();
  const { t } = useTranslation();
  const { skin } = useSkin();
  const [studySet, setStudySet] = useState(null);

  const [loadingFetch, setLoadingFetch] = useState(false);

  const [count, setCount] = useState(1);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    setLoadingFetch(true);
    studySetApi
      .getStudySetbyId({ studySetId })
      .then(({ data }) => {
        if (data.isSuccess) {
          setStudySet(data.data.studySet);

          return termApi.getTerms({ studySetId });
        }
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setTerms(data.data.terms);
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoadingFetch(false);
      });
  }, [studySetId]);

  // ** Handler
  const handleDeleteTerm = (term) => {
    // ** Delete exist Term
    if (term.createdAt)
      termApi
        .deleteTerm({ id: term._id })
        .then(({ data }) => {
          if (data.isSuccess) {
            setTerms((prev) =>
              prev.filter((t) => t?._id !== data.data.term._id)
            );
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(t("error.unknow"));
        });
    // ** Delete draft Term
    else setTerms((prev) => prev.filter((t) => t?._id !== term._id));
  };

  const handleAddTerm = () => {
    setTerms((prev) => [
      ...prev,
      { name: "", definition: "", picture: "", _id: uuidv4() },
    ]);
  };

  const handleSaveTerm = useCallback(
    _.debounce((term, index, obj) => {
      if (term.createdAt) {
        const dataReq = { ...term, ...obj };

        if (dataReq.name.trim() === "" || dataReq.definition.trim() === "")
          return;
        const formData = new FormData();
        formData.append("name", dataReq.name.trim());
        formData.append("definition", dataReq.definition.trim());
        formData.append("studySetId", studySetId);
        formData.append("id", dataReq._id);

        termApi
          .updateTerm(formData)
          .then(({ data }) => {
            if (data.isSuccess) {
              console.log(data.data.term);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        (term.name.trim() === "" || obj.name) &&
        (obj.definition || term.definition.trim() === "")
      ) {
        console.log("update");
        setTerms((prev) =>
          prev.map((term, i) => (i === index ? { ...term, ...obj } : term))
        );
      } else {
        const dataReq = { ...term, ...obj };

        if (dataReq.name.trim() === "" || dataReq.definition.trim() === "")
          return;
        const formData = new FormData();
        formData.append("name", dataReq.name.trim());
        formData.append("definition", dataReq.definition.trim());
        formData.append("studySetId", studySetId);

        termApi
          .createTerm(formData)
          .then(({ data }) => {
            if (data.isSuccess) {
              setTerms((prev) =>
                prev.map((term, i) => (i === index ? data.data.term : term))
              );

              setTimeout(() => {
                const input = document.getElementById(
                  `${obj.name ? "name" : "des"}-${data.data.term._id}`
                );

                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
              }, 10);
            } else {
              toast.error(data.message);
            }
          })
          .catch((err) => {
            toast.error(t("error.unknow"));
          });
      }
    }, 300),
    []
  );

  console.log(terms);

  return (
    <div>
      <BreadCrumbsPage
        title={t("page.edit")}
        data={[
          { title: t("page.studySet"), link: "/study-set" },
          { title: t("page.edit") },
        ]}
      />

      {loadingFetch && <PageLoading height={"70vh"} />}

      {!loadingFetch && (
        <>
          <div>
            <div className="mb-2">
              <div className="col-lg-6 col-md-6">
                <Label className="form-label" for="title">
                  {t("fieldName.title")}
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder={t("common.placeholder.addATitle")}
                  disabled
                  value={studySet?.title}
                />
              </div>
            </div>
            <div>
              <div className="col-lg-6 col-md-6">
                <Label className="form-label" for="description">
                  {t("fieldName.description")}
                </Label>
                <Input
                  type="text"
                  id="description"
                  placeholder={t("common.placeholder.addADescription")}
                  disabled
                  value={studySet?.description}
                />
              </div>
            </div>
            <div className="mt-2">
              <Button.Ripple
                color="primary"
                className="d-flex align-items-center"
              >
                <Plus size={18} />
                <span style={{ marginLeft: ".25rem" }}>
                  {t("common.import")}
                </span>
              </Button.Ripple>
            </div>
            <div className="mt-4">
              {terms.map((term, index) => (
                <Card key={term._id} style={{ padding: "1rem 1.5rem" }}>
                  <Row className="justify-content-between align-items-center">
                    <Col
                      sm={12}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: ".5rem",
                      }}
                    >
                      <div>{index + 1}</div>
                      <Button.Ripple
                        color="danger"
                        className="text-nowrap px-1"
                        onClick={() => handleDeleteTerm(term)}
                        outline
                      >
                        <Trash size={14} />
                      </Button.Ripple>
                    </Col>
                    <hr />
                    <Col md={6} className="mb-md-0 mb-1">
                      <Label
                        className="form-label"
                        for={`name-${term._id || index}`}
                      >
                        {t("fieldName.term")}
                      </Label>
                      <Input
                        type="textarea"
                        id={`name-${term._id || index}`}
                        placeholder={t("common.placeholder.enterTerm")}
                        spellCheck={false}
                        rows={3}
                        defaultValue={term.name}
                        onChange={(e) =>
                          handleSaveTerm(term, index, { name: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={6} className="mb-md-0 mb-1">
                      <Label
                        className="form-label"
                        for={`des-${term._id || index}`}
                      >
                        {t("fieldName.definition")}
                      </Label>
                      <Input
                        type="textarea"
                        id={`des-${term._id || index}`}
                        placeholder={t("common.placeholder.enterDefinition")}
                        spellCheck={false}
                        rows={3}
                        defaultValue={term?.definition}
                        onChange={(e) =>
                          handleSaveTerm(term, index, {
                            definition: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>

            <div className="mt-2" style={{ marginBottom: "6rem" }}>
              <Card>
                <Button
                  className="d-flex align-items-center justify-content-center"
                  onClick={handleAddTerm}
                  color="primary"
                >
                  <Plus size={18} />
                  <span style={{ marginLeft: ".5rem" }}>{t("common.add")}</span>
                </Button>
              </Card>
            </div>
          </div>

          <div
            className={classNames(styles.footer, {
              [styles.footer_dark]: skin === "dark",
            })}
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              padding: "1rem 24rem",
            }}
          >
            <Button.Ripple
              style={{ float: "right" }}
              color="primary"
              onClick={() => history.back()}
            >
              {t("fieldName.done")}
            </Button.Ripple>
          </div>
        </>
      )}
    </div>
  );
};

export default EditTerm;
