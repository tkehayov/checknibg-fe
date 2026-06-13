import { Button } from "@mui/material";
import { TableCell } from "@mui/material";
import { MerchantsApi } from "../../api/merchants";
import { useState, useEffect } from "react";
import { API_URLS, MERCHANTS_IMAGES_URL } from "../../config";
import s from "./style.module.css";
import { FinanceApi } from "../../api/finance";

export function MerchantListItem({ merchant, productId }) {
  const [merchantDetails, setMerchantDetails] = useState();

  function goToMerchantPage(url) {
    window.open(url, "_blank");
  }

  function updateCounter(merchantId) {
    FinanceApi.updateCounter({ merchantId: merchantId, productId: productId });
  }

  useEffect(() => {
    async function fetchMerchantInfo(id) {
      const merchantResponse = await MerchantsApi.fetchMerchant(id);
      if (merchantResponse) {
        setMerchantDetails(merchantResponse);
      }
    }

    if (merchant) {
      fetchMerchantInfo(merchant.merchantId);
    }
  }, [merchant]);

  return (
    <>
      {merchant && (
        <>
          <TableCell component="th" scope="row">
            {merchantDetails && (
              <img
                className={s.image}
                src={
                  API_URLS.products +
                  MERCHANTS_IMAGES_URL +
                  "/" +
                  merchantDetails.logo
                }
                alt={merchant.name}
              />
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {merchant.price} лв
          </TableCell>
          {merchantDetails && (
            <TableCell component="th" scope="row">
              {merchantDetails.name}
            </TableCell>
          )}
          <TableCell>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => {
                goToMerchantPage(merchant.url);
                updateCounter(merchant.merchantId);
              }}
            >
              Към Магазина
            </Button>
          </TableCell>
        </>
      )}
    </>
  );
}
