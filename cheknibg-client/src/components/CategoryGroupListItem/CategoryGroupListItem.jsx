import { useState } from "react";
import { ProductFiltersListItem } from "../ProductFiltersListItem/ProductFiltersListItem";
import { Button } from "@mui/material";

const MAX_VISIBLE_FILTERS = 4;

export function CategoryGroupListItem({
  filter,
  onChangeProductItem,
  loadingPage,
  selectedProductFilters,
}) {
  const [showAll, setShowAll] = useState(false);

  const allFilters = filter.productFilters;

  const displayedFilters = showAll
    ? allFilters
    : allFilters.slice(0, MAX_VISIBLE_FILTERS);

  const hasMore = allFilters.length > MAX_VISIBLE_FILTERS;

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div>
      {filter.name}

      {displayedFilters.map((productFilter) => {
        return (
          <div key={productFilter.id}>
            {
              <ProductFiltersListItem
                onChange={onChangeProductItem}
                productFilter={productFilter}
                loadingPage={loadingPage}
                selectedProductFilters={selectedProductFilters}
              />
            }
          </div>
        );
      })}
      {hasMore && !showAll && (
        <Button
          onClick={handleShowMore}
          variant="text"
          size="small"
          sx={{ paddingLeft: 0, textTransform: "none" }}
        >
          Повече ({allFilters.length - MAX_VISIBLE_FILTERS})
        </Button>
      )}

      {showAll && hasMore && (
        <Button
          onClick={handleShowLess}
          variant="text"
          size="small"
          sx={{ paddingLeft: 0, textTransform: "none" }}
        >
          По-малко
        </Button>
      )}
    </div>
  );
}
