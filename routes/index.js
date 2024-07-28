const productRoutes = require('../routes/product.routes');

const express = require("express");
const router = express.Router();

class Router {
    static getRoutes = () => {
      // Routes
      router.use("/products", productRoutes);
  
      // default index route
      router.get("/", (_, res) => res.send("Welcome to app."));
  
      return router;
    };
}
module.exports = Router;