import { useState } from "react";
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  IconButton,
  Typography,
  FormGroup,
  AppBar,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryGroupListItem } from "../CategoryGroupListItem/CategoryGroupListItem";

export default function ProductFilterDrawer({
  currentCategoryFilters,
  onClickItem,
  loadingPage,
  selectedProductFilters,
}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    console.log("newOpen", currentCategoryFilters);
    setOpen(newOpen);
  };

  const drawerList = (
    <Box role="presentation">
      {/* NAV TEXT AND CLOSE BUTTON */}
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
          <h2>Филтри</h2>
        </Box>
        <IconButton
          onClick={() => {
            toggleDrawer(false)();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ marginBottom: 5, paddingLeft: 2 }}>
        <FormGroup>
          {currentCategoryFilters.map((filter) => {
            return (
              <div key={filter.id}>
                <CategoryGroupListItem
                  onChangeProductItem={onClickItem}
                  filter={filter}
                  loadingPage={loadingPage}
                  selectedProductFilters={selectedProductFilters}
                />
              </div>
            );
          })}
        </FormGroup>
      </List>
      <Button
        sx={{ width: "100%", position: "fixed", bottom: 0 }}
        variant="contained"
        color="primary"
        onClick={() => toggleDrawer(false)()}
      >
        Приложи филтрите
      </Button>
    </Box>
  );

  return (
    <Box>
      <Button
        startIcon={<FilterAltIcon />}
        onClick={toggleDrawer(true)}
        size="large"
        variant="contained"
        color="primary"
      >
        Филтри
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {drawerList}
      </Drawer>
    </Box>
  );
}
