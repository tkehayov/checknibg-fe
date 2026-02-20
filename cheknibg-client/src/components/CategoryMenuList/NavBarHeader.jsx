import {
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Button,
  MenuItem,
  StepIcon,
  ListSubheader,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { DrawerNavList } from "./DrawerNavList";
import { useNavigate } from "react-router-dom";
import { PAGES_URL } from "../../config";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export function NavBarHeader({ navData, selectedCategory }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedMainIndex, setSelectedMainIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [submenuAnchorEls, setSubmenuAnchorEls] = useState({});
  const handleOpenSubmenu = (event, index) => {
    setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: event.currentTarget });
  };

  const handleCloseMenu = (index) => {
    setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: null });
    setSelectedMainIndex(null);
  };

  const handleCloseSubmenu = (index, submenuId) => {
    let category = navData[index];
    let alias = category.alias;
    let currentCategory = {
      id: category.id,
    };

    setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: null });
    setSelectedMainIndex(null);
    if (submenuId === 0) {
      navigate(PAGES_URL.category + `/${alias}`);

      selectedCategory(currentCategory);
      return;
    }

    selectedCategory(currentCategory);
    navigate(PAGES_URL.category + `/${alias}`, {
      state: { filters: submenuId },
    });
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Toolbar disableGutters>
        <StepIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer(true)}
            color="inherit"
          >
            <MenuIcon color="success" sx={{ fontSize: 40 }} />
          </IconButton>
          <DrawerNavList
            pages={navData}
            open={open}
            toggleDrawer={toggleDrawer}
            selectedCategory={selectedCategory}
          />
        </Box>

        <Box
          sx={{
            paddingBottom: "0px",
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {navData.map((page, index) => (
            <Box key={`nav-item-${index}`}>
              <Button
                sx={{
                  ...(selectedMainIndex === index && {
                    backgroundColor: "#24b2cc",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#24b2cc",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -3,
                      left: "50%",
                      transform: "translateX(-50%) rotate(180deg)",

                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid white",
                    },
                  }),
                  "&.Mui-selected:hover": {
                    backgroundColor: colors.primary[900],
                    color: "white",
                  },
                  "&.Mui-selected": {
                    backgroundColor: colors.primary[900],
                    color: "white",
                  },

                  "&:hover,click": {
                    backgroundColor: colors.primary[900],
                    color: "white",
                  },
                  marginTop: "10px",
                }}
                onClick={(e) => {
                  setSelectedMainIndex(index);
                  handleOpenSubmenu(e, index);
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "15px",
                      lg: "16px",
                    },
                    padding: {
                      md: "4px",
                      lg: "10px",
                    },
                    textTransform: "none",
                  }}
                >
                  {page.main}
                </Typography>
              </Button>

              <Menu
                anchorEl={submenuAnchorEls[index]}
                open={Boolean(submenuAnchorEls[index])}
                onClose={() => handleCloseMenu(index)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "3px",
                      paddingTop: 0,
                      paddingLeft: 2,
                      paddingRight: 2,
                      paddingBottom: 2,
                      minWidth: 150,
                    },
                  },
                }}
                MenuListProps={{
                  sx: {
                    display: "flex",
                    flexDirection: "row",
                    gap: 0,
                    paddingTop: 0,
                  },
                }}
              >
                {page.sub.map((subItem, subIndex) => (
                  <Box
                    key={`submenu-col-${subIndex}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 150,
                    }}
                  >
                    <ListSubheader disableSticky sx={{ pl: 0 }}>
                      {subItem.title}
                    </ListSubheader>
                    {subItem.items.map((item, itemIndex) => (
                      <MenuItem
                        key={`item-${subIndex}-${itemIndex}`}
                        onClick={() => handleCloseSubmenu(index, item.id)}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Box>
                ))}
              </Menu>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </Container>
  );
}
