// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown";
import UserDropdown from "./UserDropdown";
import NavbarSearch from "./NavbarSearch";
import NotificationDropdown from "./NotificationDropdown";

const NavbarUser = () => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <IntlDropdown />
      <NavbarSearch />
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
