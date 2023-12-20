import { TableRow, TableCell } from "@mui/material";
import React from "react";

export function ProductSpecificationListItem({ productSpecGroup }) {
  return (
    <>
      <TableRow
        component="th"
        scope="row"
        sx={{ width: "100%", backgroundColor: "grey" }}
      >
        <TableCell>
          <strong>{productSpecGroup.name}</strong>
        </TableCell>
      </TableRow>

      {productSpecGroup &&
        productSpecGroup.properties.map((property, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{property.key}</TableCell>
              <TableCell>{property.value}</TableCell>
            </TableRow>
          );
        })}
    </>
  );
}
