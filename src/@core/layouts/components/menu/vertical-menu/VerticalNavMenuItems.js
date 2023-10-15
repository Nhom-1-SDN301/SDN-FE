// ** Vertical Menu Components
import VerticalNavMenuLink from "./VerticalNavMenuLink";
import VerticalNavMenuGroup from "./VerticalNavMenuGroup";
import VerticalNavMenuSectionHeader from "./VerticalNavMenuSectionHeader";

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";

// ** Redux
import { useSelector } from "react-redux";

const VerticalMenuNavItems = (props) => {
  // ** Hooks
  const user = useSelector((state) => state.auth.user);

  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader,
  };

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)];
    // if (item.children) {
    //   return (
    //     canViewMenuGroup(item) && (
    //       <TagName item={item} index={index} key={item.id} {...props} />
    //     )
    //   );
    // }
    const can = item.can?.includes(user?.role?.id);
    if ((user && can) || !item.authorization)
      return <TagName key={item.id || item.header} item={item} {...props} />;
  });

  return RenderNavItems;
};

export default VerticalMenuNavItems;
