const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/products-service/api",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );

  app.use(
    "/merchants-service/api",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );
};
