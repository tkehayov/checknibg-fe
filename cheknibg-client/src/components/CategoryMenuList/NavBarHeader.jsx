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
import { DrawerNav, DrawerNavList } from "./DrawerNavList";

const pages = [
  {
    main: "лаптопи",
    sub: [
      {
        title: "Марки",
        itemss: [
          "Всички",
          "Dell",
          "ASUS",
          "Lenovo",
          "Acer",
          "HP",
          "MSI",
          "Apple",
          "Microsoft",
          "Gigabyte",
        ],
      },
      {
        title: "оперативна памет",
        itemss: ["8 GB", "16 GB", "32 GB"],
      },
    ],
  },
  {
    main: "компютри",
    sub: [{ title: "Марки", itemss: ["Pricing1.1", "Pricing1.2"] }],
  },
  {
    main: "таблети",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "чанти и раници",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "смартфони",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "смарт часовници",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "периферия",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "мултимедия",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "компоненти",
    sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }],
  },
  { main: "ups", sub: [{ title: "Марки", itemss: ["Blog1.1", "Blog1.2"] }] },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];
export function NavBarHeader() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [submenuAnchorEls, setSubmenuAnchorEls] = useState({});
  const handleOpenSubmenu = (event, index) => {
    setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: event.currentTarget });
  };
  const handleCloseSubmenu = (index) => {
    setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: null });
  };
  return (
    <Container maxWidth="xl">
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
            <MenuIcon />
          </IconButton>
          <DrawerNavList
            pages={pages}
            open={open}
            toggleDrawer={toggleDrawer}
          />

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page, index) => (
              <div key={index}>
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {page.main}
                  </Typography>
                </MenuItem>
              </div>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page, index) => (
            <Box key={`nav-item-${index}`}>
              <Button
                onClick={(e) => handleOpenSubmenu(e, index)}
                sx={{ color: "black", display: "block" }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.7rem",
                      lg: "14px",
                    },
                  }}
                >
                  {page.main}
                </Typography>
              </Button>
              <Menu
                anchorEl={submenuAnchorEls[index]}
                open={Boolean(submenuAnchorEls[index])}
                onClose={() => handleCloseSubmenu(index)}
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
                      p: 2,
                      minWidth: 150,
                    },
                  },
                }}
                MenuListProps={{
                  sx: {
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
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
                    {subItem.itemss.map((item, itemIndex) => (
                      <MenuItem
                        key={`item-${subIndex}-${itemIndex}`}
                        onClick={() => handleCloseSubmenu(index)}
                      >
                        {item}
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
