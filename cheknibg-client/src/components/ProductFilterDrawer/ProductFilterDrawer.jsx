import { useState } from "react";
import {
  Button,
  Drawer,
  Box,
  List,
  IconButton,
  FormGroup,
  Accordion,
  AccordionDetails,
  Chip,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { CategoryGroupListItem } from "../CategoryGroupListItem/CategoryGroupListItem";
import { PriceFilterSlider } from "../PriceFilterSlider/PriceFilterSlider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SortTwoToneIcon from "@mui/icons-material/SortTwoTone";
import PageSizeProducts from "../PageSizeProducts/PageSizeProducts";
import PriceNameSortProducts from "../PriceNameSortProducts/PriceNameSortProducts";

export default function ProductFilterDrawer({
  currentCategoryFilters,
  onClickItem,
  loadingPage,
  selectedProductFilters,
  productFilterPrice,
  setSelectedProductFilterPrice,
  sortSize,
  onSizeChange,
  onSortNamePrice,
}) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
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

      {selectedProductFilters.length > 0 && (
        <Box
          sx={{
            px: 2,
            pt: 1,
            pb: 0.5,
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
          }}
        >
          {currentCategoryFilters
            .flatMap((cat) => cat.productFilters)
            .filter((pf) => selectedProductFilters.includes(pf.id))
            .map((pf) => (
              <Chip
                key={pf.id}
                variant="outlined"
                size="small"
                label={pf.filter}
                color="primary"
                onDelete={() => onClickItem(pf, { target: { checked: false } })}
              />
            ))}
          <Chip
            size="small"
            label="Изчисти филтри"
            variant="filled"
            color="primary"
            onClick={() => onClickItem({ id: 0 }, {})}
          />
        </Box>
      )}
      <List sx={{ marginBottom: 5, paddingLeft: 2 }}>
        <FormGroup>
          <PriceFilterSlider
            productFilterPrice={productFilterPrice}
            setSelectedProductFilterPrice={setSelectedProductFilterPrice}
          />
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
        sx={{
          width: "100%",
          position: "relative",
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
      <Box display={"flex"} gap={1} alignItems="center">
        <Button
          color="primary"
          startIcon={<FilterAltIcon />}
          onClick={toggleDrawer(true)}
          size="large"
          variant="contained"
          disableElevation
          sx={{
            width: "50%",
            borderRadius: 6,
            fontWeight: 900,
          }}
        >
          Филтри
        </Button>
        <Button
          color="secondary"
          startIcon={<SortTwoToneIcon />}
          endIcon={expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          onClick={handleAccordionToggle}
          size="large"
          variant="outlined"
          sx={{
            width: "50%",
            borderRadius: 6,
            fontWeight: 900,
          }}
        >
          сортирай
        </Button>
      </Box>
      <Accordion
        expanded={expanded}
        elevation={0}
        disableGutters
        sx={{
          borderRadius: "0px !important",
          borderBottom: (theme) => `2px solid ${theme.palette.primary.main}`,
          visibility: expanded ? "visible" : "hidden",
          height: expanded ? "auto" : 0,
        }}
      >
        <AccordionDetails
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              pt: 1,
              gap: 2,
            }}
          >
            <PriceNameSortProducts onSortNamePrice={onSortNamePrice} />
            <PageSizeProducts sortSize={sortSize} onSizeChange={onSizeChange} />
          </Box>
        </AccordionDetails>
      </Accordion>
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
