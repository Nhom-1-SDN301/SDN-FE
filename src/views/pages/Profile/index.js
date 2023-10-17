// ** I18n
import { useTranslation } from "react-i18next";

// ** Custom Components
import BreadCrumbsPage from "@components/breadcrumbs";

const Profile = () => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <div>
      <BreadCrumbsPage
        title={t("page.user")}
        data={[{ title: t("page.managment") }, { title: t("page.user") }]}
      />
    </div>
  );
};

export default Profile;
