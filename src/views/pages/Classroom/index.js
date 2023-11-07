// ** Reactstrap
import { Card, Col, Row, TabContent, TabPane } from "reactstrap";

// ** React
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

// ** Components
import BreadCrumbsPage from "@components/breadcrumbs";
import Header from "./Header";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Third libs
import { toast } from "react-hot-toast";

// ** Apis
import { classApi } from "../../../@core/api/quiz/classApi";
import StreamTabContent from "./StreamTabContent";
import LoadingTab from "./LoadingTab";
import PeopleTabContent from "./PeopleTabContent";
import TestTabContent from "./TestTabContent";
import ManageTest from "./ManageTest";
import { useSelector } from "react-redux";

const Classroom = () => {
  // ** Hooks
  const { t } = useTranslation();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [klass, setKlass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    fetchingClass(id);
  }, [id]);

  // ** Handler
  const fetchingClass = (classId) => {
    if (classId) {
      setLoading(true);
      classApi
        .getClassById({ id: classId })
        .then(({ data }) => {
          if (data.isSuccess) {
            setKlass(data.data.class);
          }
        })
        .catch((err) => {
          toast.error(err?.message || t("error.unknow"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const canManageTest = useMemo(
    () =>
      klass?.userId === user?._id ||
      klass?.members?.find((member) => member.userId === user?._id)?.canCreateTest,
    [klass, user]
  );

  return (
    <div>
      <BreadCrumbsPage
        title={t("page.classroom")}
        data={[
          { title: t("page.classroom"), link: "/classes" },
          { title: klass?.name || "" },
        ]}
      />

      <Row>
        <Col xs={12}>
          <Header
            className="mb-2"
            activeTab={activeTab}
            toggleTab={toggleTab}
            canManageTest={canManageTest}
          />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              {loading ? (
                <LoadingTab />
              ) : (
                <StreamTabContent klass={klass} setKlass={setKlass} />
              )}
            </TabPane>
            <TabPane tabId="2">
              {loading ? <LoadingTab /> : <TestTabContent klass={klass} />}
            </TabPane>
            <TabPane tabId="3">
              {loading ? <LoadingTab /> : <PeopleTabContent klass={klass} />}
            </TabPane>
            <TabPane tabId="4">
              {loading ? (
                <LoadingTab />
              ) : (
                <ManageTest user={user} klass={klass} />
              )}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  );
};

export default Classroom;
