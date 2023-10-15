// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/HorizontalLayout";

// ** Menu Items Array
import getMenuHorizontalData from "@src/navigation/horizontal";

// ** I18n
import { useTranslation } from "react-i18next";

const HorizontalLayout = (props) => {
  // const [menuData, setMenuData] = useState([])
  const { t } = useTranslation();

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={getMenuHorizontalData({ t })} {...props}>
      <Outlet />
    </Layout>
  );
};

export default HorizontalLayout;
