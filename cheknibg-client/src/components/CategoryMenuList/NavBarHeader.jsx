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
  Stack,
  Popover,
  List,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { DrawerNavList } from "./DrawerNavList";
import { useNavigate } from "react-router-dom";
import { PAGES_URL } from "../../config";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { NavMenu } from "../NavMenu/NavMenu";

export function NavBarHeader({ navData, selectedCategory }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedMainIndex, setSelectedMainIndex] = useState(null);
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const toggleDrawer = (newOpen) => () => {
  //   setOpen(newOpen);
  // };

  // const [submenuAnchorEls, setSubmenuAnchorEls] = useState({});
  // const handleOpenSubmenu = (event, index) => {
  //   setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: event.currentTarget });
  // };

  // const handleCloseMenu = (index) => {
  //   setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: null });
  //   setSelectedMainIndex(null);
  // };

  // const handleCloseSubmenu = (index, submenuId) => {
  //   let category = navData[index];
  //   let alias = category.alias;
  //   let currentCategory = {
  //     id: category.id,
  //   };

  //   setSubmenuAnchorEls({ ...submenuAnchorEls, [index]: null });
  //   setSelectedMainIndex(null);
  //   if (submenuId === 0) {
  //     selectedCategory(currentCategory);

  //     navigate(PAGES_URL.category + `/${alias}`, {
  //       state: { filters: 0 },
  //     });
  //     return;
  //   }

  //   selectedCategory(currentCategory);
  //   navigate(PAGES_URL.category + `/${alias}`, {
  //     state: { filters: submenuId },
  //   });
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Toolbar disableGutters>
        <StepIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

        <Box>
          <Stack
            direction="row"
            alignItems="center"
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              display: "inline-flex",
              color: "black",
              p: 1,
              // border: "1px solid red",
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon fontSize="large" />}
            <Typography>Меню</Typography>
          </Stack>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                width: "480px",
                pt: 3,
                // mt: 3,
                // borderRadius: 0,
                // border: "1px solid red",
                // borderWidth: "3px",
                // borderTopStyle: "3px",
                // borderColor: "red",
              },
            }}
          >
            <List disablePadding>
              <NavMenu navData={navData} handleClose={handleClose} />
            </List>
          </Popover>
        </Box>
      </Toolbar>
    </Container>
  );
}
