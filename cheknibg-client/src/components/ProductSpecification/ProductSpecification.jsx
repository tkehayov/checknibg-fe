import { Paper, TableContainer, Table, TableBody } from "@mui/material";

import { ProductSpecificationListItem } from "../ProductSpecificationListItem/ProductSpecificationListItem";

export function ProductSpecificationList({ productSpecGroup }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {productSpecGroup &&
              productSpecGroup.map((productSpecGroup, index) => {
                return (
                  <ProductSpecificationListItem
                    key={index}
                    productSpecGroup={productSpecGroup}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
