const PAGES_URL = {
  home: "/",
  category: "/category",
  product: "/product",
  searchResultPage: "/search",
  contact: "/contact",
  about: "/about",
  terms: "/terms",
  privacy: "/privacy",
  cookies: "/cookies-policy",
  cookieSettings: "/cookies-settings",
};

// merchants.[URL]
const MERCHANT_PORTAL_URL = (() => {
  const hostname = window.location.hostname.replace(/^www\./, "");
  return `${window.location.protocol}//merchants.${hostname}`;
})();

const IMAGES_URL = "/images";
const PRODUCTS_IMAGES_URL = IMAGES_URL + "/products";
const PRODUCTS_IMAGES_URL_THUMBNAILS = IMAGES_URL + "/products/thumbnails";
const MERCHANTS_IMAGES_URL = IMAGES_URL + "/merchants";

const API_URLS = {
  merchants: `/merchants-service/api`,
  products: `/products-service/api`,
  finance: `/finance-service/api`,
};

export {
  PAGES_URL,
  PRODUCTS_IMAGES_URL,
  PRODUCTS_IMAGES_URL_THUMBNAILS,
  MERCHANTS_IMAGES_URL,
  API_URLS,
  MERCHANT_PORTAL_URL,
};
