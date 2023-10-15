// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import getMenuVerticalData from "@src/navigation/vertical";

// ** I18n
import { useTranslation } from "react-i18next";

const VerticalLayout = (props) => {
  // const [menuData, setMenuData] = useState([])
  const { t } = useTranslation();

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={getMenuVerticalData({ t })} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
