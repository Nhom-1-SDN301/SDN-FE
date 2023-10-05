// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown";
import UserDropdown from "./UserDropdown";
import NavbarSearch from "./NavbarSearch";
import NotificationDropdown from "./NotificationDropdown";

// ** Redux
import { useSelector } from "react-redux";

const NavbarUser = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      <NavbarSearch />
      {user && (
        <>
          <NotificationDropdown />
        </>
      )}
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
