// ** React
import { useState } from "react";

// ** Reactstrap
import { Col, Row, TabContent, TabPane } from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Custom Components
import BreadCrumbsPage from "@components/breadcrumbs";
import AccountTabContent from "./AccountTabContent";
import Tabs from "./Tabs";
import SecurityTabContent from "./SecurityTabContent";
import LayoutTabContent from "./LayoutTabContent";

const Setting = () => {
  // ** Hooks
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");
  const [data, setData] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <BreadCrumbsPage
        title={t("page.setting")}
        data={[{ title: t("page.setting") }]}
      />

      <Row>
        <Col xs={12}>
          <Tabs className="mb-2" activeTab={activeTab} toggleTab={toggleTab} />

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <AccountTabContent />
            </TabPane>
            <TabPane tabId="2">
              <SecurityTabContent />
            </TabPane>
            <TabPane tabId="3">
              <LayoutTabContent />
            </TabPane>
            {/* <TabPane tabId="4">
              <NotificationsTabContent />
            </TabPane>
            <TabPane tabId="5">
              <ConnectionsTabContent />
            </TabPane> */}
          </TabContent>
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
