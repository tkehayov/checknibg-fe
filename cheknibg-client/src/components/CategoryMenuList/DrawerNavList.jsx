import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import { ReactComponent as Logo } from "../../assets/images/CHEKNI-LOGO.svg";
import CloseIcon from "@mui/icons-material/Close";

export function DrawerNavList({ pages, open, toggleDrawer }) {
  const DrawerList = (
    <Box role="presentation">
      {/* LOGO AND CLOSE BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link href="/" onClick={toggleDrawer(false)}>
            <Logo style={{ height: "60px", width: "auto" }} />
          </Link>
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {pages.map((text, index) => (
          <div key={index}>
            <ListItem key={text.main} disablePadding>
              <ListItemButton>
                <ListItemText primary={text.main} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: "100%",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
