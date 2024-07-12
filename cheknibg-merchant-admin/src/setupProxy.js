const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/products",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );

  app.use(
    "/auth/register",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );
  app.use(
    "/auth/authenticate",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );
  app.use(
    "/merchants/api",
    createProxyMiddleware({
      target: "http://localhost:9090",
      changeOrigin: true,
    })
  );
};
