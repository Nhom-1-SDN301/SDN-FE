// ** Menu Components Imports
import HorizontalNavMenuLink from "./HorizontalNavMenuLink";
import HorizontalNavMenuGroup from "./HorizontalNavMenuGroup";
import { resolveHorizontalNavMenuItemComponent as resolveNavItemComponent } from "@layouts/utils";
import { useSelector } from "react-redux";

const HorizontalNavMenuItems = (props) => {
  // ** Hooks
  const user = useSelector((state) => state.auth.user);

  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  };

  // ** Render Nav Items
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

export default HorizontalNavMenuItems;
