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

const pages = [
  {
    main: "Лаптопи",
    sub: [
      {
        title: "Марки",
        items: [
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
        title: "Оперативна памет",
        items: ["8 GB", "16 GB", "32 GB"],
      },
      {
        title: "Процесор",
        items: ["Intel Core i7 (12-ядрен)", "Intel Core i5 (4-ядрен)"],
      },
    ],
  },
  {
    main: "Компютри",
    sub: [{ title: "Марки", items: ["Pricing1.1", "Pricing1.2"] }],
  },
  {
    main: "Таблети",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Смартфони",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Часовници",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Aудио",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Монитори",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Телевизори",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Периферия",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Kомпоненти",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
  {
    main: "Аксесоари",
    sub: [{ title: "Марки", items: ["Blog1.1", "Blog1.2"] }],
  },
];

export function NavBarHeader() {
  const [selectedMainIndex, setSelectedMainIndex] = useState(null);
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
    setSelectedMainIndex(null);
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
            pages={pages}
            open={open}
            toggleDrawer={toggleDrawer}
          />
        </Box>

        <Box
          sx={{
            paddingBottom: "0px",
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {pages.map((page, index) => (
            <Box key={`nav-item-${index}`}>
              <Button
                sx={{
                  ...(selectedMainIndex === index && {
                    backgroundColor: "#2fccc2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#2aada6",
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
                    backgroundColor: "#2fccc2",
                    color: "white",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#2fccc2",
                    color: "white",
                  },

                  "&:hover,click": {
                    backgroundColor: "#2fccc2",
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
