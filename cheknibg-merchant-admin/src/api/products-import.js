import axios from "axios";
import { BASE_URL } from "../config";

export class ProductImportApi {
  static async importProducts(formData) {
    const response = await axios.post(
      `${BASE_URL}/merchant-product/file`,
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
