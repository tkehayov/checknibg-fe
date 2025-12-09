import { ProductSearchFiltersListItem } from "../ProductSearchFiltersListItem/ProductSearchFiltersListItem";

export function SearchGroupListItem({
  filter,
  onChangeProductItem,
  selectedProductFilters,
  loadingPage,
}) {
  return (
    <div>
      <div key={filter.id}>
        {
          <ProductSearchFiltersListItem
            productFilter={filter}
            onChange={onChangeProductItem}
            selectedProductFilters={selectedProductFilters}
            loadingPage={loadingPage}
          />
        }
      </div>
    </div>
  );
}
