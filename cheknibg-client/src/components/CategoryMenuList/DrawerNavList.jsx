import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  Box,
} from "@mui/material";

export function DrawerNavList({ pages, open, toggleDrawer }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
