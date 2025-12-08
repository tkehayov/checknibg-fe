import { useState } from "react";
import {
  Button,
  Drawer,
  Box,
  List,
  IconButton,
  FormGroup,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { SearchGroupListItem } from "../SearchGroupListItem/SearchGroupListItem";

export default function ProductSearchFilterDrawer({
  filters,
  onClickItem,
  selectedProductFilters,
}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
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
          {filters.map((filter) => {
            return (
              <SearchGroupListItem
                onChangeProductItem={onClickItem}
                filter={filter}
              />
            );
          })}
        </FormGroup>
      </List>
      <Button
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          color: "#fff",
          fontWeight: 900,
        }}
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
        color="primary"
        startIcon={<FilterAltIcon />}
        onClick={toggleDrawer(true)}
        size="large"
        variant="contained"
        sx={{
          color: "#fff",
          borderRadius: 6,
          fontWeight: 900,
        }}
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
