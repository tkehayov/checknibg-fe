import MenuItem from "@mui/material/MenuItem";

import { Link as ReactRouterLink } from "react-router-dom";

export function CategoryMenuListItem({ category, handleClose, href }) {
  return (
    <>
      <MenuItem
        component={ReactRouterLink}
        onClick={() => handleClose(category)}
        to={href}
      >
        {category.name}
      </MenuItem>
    </>
  );
}
