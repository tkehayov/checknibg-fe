const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/products",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/merchant-product",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/categories",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/images",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/merchants",
    createProxyMiddleware({
      target: "http://localhost:8070",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/merchants-settings",
    createProxyMiddleware({
      target: "http://localhost:8070",
      changeOrigin: true,
    })
  );
};
