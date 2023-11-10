import { CategoryMenuListItem } from "../CategoryMenuListItem/CategoryMenuListItem";

export function CategoryMenuList({ categories }) {
  return (
    <div>
      {categories.map((category) => {
        return (
          <span key={category.id}>
            <CategoryMenuListItem category={category} />
          </span>
        );
      })}
    </div>
  );
}
