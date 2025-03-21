import axios from "axios";
import { API_URLS } from "../config";

export class Products {
  static async getProductIdByCodeId(codeId) {
    const response = await axios
      .get(`${API_URLS.products}/products/code-id/${codeId}`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error) {
          return error.response;
        }
      });

    return response.data;
  }
}
