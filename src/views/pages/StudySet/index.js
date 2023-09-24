// ** Reactstrap import
import {
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";

// ** Icons import
import { Search } from "react-feather";

// ** Components import
import BreadCrumbsPage from "@components/breadcrumbs";
import NavbarComponent from "../../ui-elements/navbars/NavbarComponent";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";
import YourStudySet from "./YourStudySet";

const StudySet = () => {
  // ** Hooks
  const { t } = useTranslation();
  const [selectIndex, setSelectIndex] = useState(0);

  const itemsNav = [
    {
      name: t("fieldName.yourStudySet"),
    },
    {
      name: t("fieldName.sharedToYou"),
    },
  ];

  return (
    <div style={{ maxWidth: 1080 }}>
      <BreadCrumbsPage
        title={t("page.studySet")}
        data={[{ title: t("page.studySet") }]}
      />
      <NavbarComponent
        items={itemsNav}
        activeIndex={selectIndex}
        setActiveIndex={setSelectIndex}
      />
      <hr style={{ margin: 0 }} />
      {selectIndex === 0 && <YourStudySet />}
    </div>
  );
};

export default StudySet;
