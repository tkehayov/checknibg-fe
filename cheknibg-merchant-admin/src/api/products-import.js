import axios from "axios";
import { API_URLS } from "../config";

export class ProductImportApi {
  static async importProducts(formData, merchantId) {
    const response = await axios.post(
      `${API_URLS.products}/merchant-product/file/${merchantId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
}
