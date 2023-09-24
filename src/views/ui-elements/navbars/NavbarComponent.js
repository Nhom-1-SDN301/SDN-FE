// ** Reactstrap import
import { Nav, NavItem, NavLink } from "reactstrap";

// **Styles
import styles from "./style.module.scss";

const NavbarComponent = ({ items, activeIndex, setActiveIndex }) => {
  return (
    <Nav>
      {items.map((item, index) => (
        <NavItem key={index}>
          <NavLink
            className={index === activeIndex && styles.active}
            onClick={() => setActiveIndex(index)}
            href="#"
          >
            {item.name}
          </NavLink>
        </NavItem>
      ))}
      {/* <NavItem>
        <NavLink className={styles.active} href="#">
          Active
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">
          Shared to you
        </NavLink>
      </NavItem> */}
    </Nav>
  );
};

export default NavbarComponent;
