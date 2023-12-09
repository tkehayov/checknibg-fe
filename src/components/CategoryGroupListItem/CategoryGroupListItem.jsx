import { ProductFiltersListItem } from "../ProductFiltersListItem/ProductFiltersListItem";

export function CategoryGroupListItem({ filter, onChangeProductItem }) {
  return (
    <div>
      {filter.name}

      {filter.productFilters.map((productFilter) => {
        return (
          <div key={productFilter.id}>
            {
              <ProductFiltersListItem
                onChange={onChangeProductItem}
                productFilter={productFilter}
              />
            }
          </div>
        );
      })}
    </div>
  );
}
