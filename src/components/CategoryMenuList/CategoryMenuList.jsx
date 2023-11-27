import { CategoryMenuListItem } from "../CategoryMenuListItem/CategoryMenuListItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState } from "react";
import { PAGES_URL } from "../../config";

export function CategoryMenuList({ categories }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        startIcon={open ? <MenuOpenIcon /> : <MenuIcon />}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
      ></Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category) => {
          return (
            <span key={category.id}>
              <CategoryMenuListItem
                handleClose={handleClose}
                category={category}
                href={PAGES_URL.category + `/${category.alias}`}
              />
            </span>
          );
        })}
      </Menu>
    </div>
  );
}
