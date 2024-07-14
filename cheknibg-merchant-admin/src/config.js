const BASE_API_URL = "";

const PAGES_URL = {
  home: "/",
  products: "/products",
  settings: "/settings",
  import: "/import",
  login: "/login",
  register: "/register",
};

const API_URLS = {
  products: `/products-service/api`,
  merchants: `/merchants-service/api`,
  base: `${BASE_API_URL}`,
};

export { BASE_API_URL, PAGES_URL, API_URLS };
