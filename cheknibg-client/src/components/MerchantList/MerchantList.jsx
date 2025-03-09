import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import { MerchantListItem } from "../MerchantListItem/MerchantListItem";

export function MerchantList({ merchants, productId }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {merchants &&
              merchants.map((merchant) => {
                return (
                  <TableRow key={merchant.id}>
                    <MerchantListItem
                      merchant={merchant}
                      productId={productId}
                    />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
