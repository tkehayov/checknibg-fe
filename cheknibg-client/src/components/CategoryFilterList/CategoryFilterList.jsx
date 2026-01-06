import FormGroup from "@mui/material/FormGroup";
import { CategoryGroupListItem } from "../CategoryGroupListItem/CategoryGroupListItem";
import { Box } from "@mui/material";
import ProductFilterDrawer from "../ProductFilterDrawer/ProductFilterDrawer";
import { PriceFilterSlider } from "../PriceFilterSlider/PriceFilterSlider";

export function CategoryFilterList({
  onClickItem,
  loadingPage,
  selectedProductFilters,
  setSelectedProductFilterPrice,
  currentCategoryFilters,
  productFilterPrice,
}) {
  return (
    <>
      <Box sx={{ display: { md: "none" } }}>
        <ProductFilterDrawer
          currentCategoryFilters={currentCategoryFilters}
          onClickItem={onClickItem}
          loadingPage={loadingPage}
          selectedProductFilters={selectedProductFilters}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                />
              </div>
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
}
