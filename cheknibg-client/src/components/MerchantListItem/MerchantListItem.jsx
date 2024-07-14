import { Button } from "@mui/material";
import { TableCell } from "@mui/material";
import { MerchantsApi } from "../../api/merchants";
import { useState, useEffect } from "react";
import { API_URLS, MERCHANTS_IMAGES_URL } from "../../config";
import s from "./style.module.css";

export function MerchantListItem({ merchant }) {
  const [merchantDetails, setMerchantDetails] = useState();
  async function fetchMerchantInfo(id) {
    const merchantResponse = await MerchantsApi.fetchMerchant(id);
    if (merchantResponse) {
      setMerchantDetails(merchantResponse);
    }
  }

  function goToMerchantPage(url) {
    window.open(url, "_blank");
  }

  useEffect(() => {
    if (merchant) {
      fetchMerchantInfo(merchant.id);
    }
  }, []);

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
                  "/images" +
                  MERCHANTS_IMAGES_URL +
                  "/" +
                  merchantDetails.logo
                }
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
              onClick={() => goToMerchantPage(merchant.url)}
            >
              Към Магазина
            </Button>
          </TableCell>
        </>
      )}
    </>
  );
}
