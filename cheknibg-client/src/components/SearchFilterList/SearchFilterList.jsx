import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/material";

import { SearchGroupListItem } from "../SearchGroupListItem/SearchGroupListItem";
import ProductSearchFilterDrawer from "../ProductSearchFilterDrawer/ProductSearchFilterDrawer";

export function SearchFilterList({
  filters,
  onClickItem,
  selectedProductFilters,
}) {
  const sortedFilters = [...filters].sort((a, b) => {
    const nameA = a.value;
    const nameB = b.value;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <Box sx={{ display: { md: "none" } }}>
        <ProductSearchFilterDrawer
          filters={sortedFilters}
          onClickItem={onClickItem}
          selectedProductFilters={selectedProductFilters}
        />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <FormGroup>
          Категория
          {sortedFilters.map((filter) => {
            return (
              <div key={filter.id}>
                <SearchGroupListItem
                  onChangeProductItem={onClickItem}
                  filter={filter}
                  //   loadingPage={loadingPage}
                />
              </div>
            );
          })}
        </FormGroup>
      </Box>
    </>
  );
}
