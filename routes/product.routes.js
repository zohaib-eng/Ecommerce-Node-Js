const productController  = require('../controllers/product.controller');

const express = require('express');
const fileUpload = require('../middlewares/imageUpload.middleware');
const router = express.Router();

router.get("/filter", productController.filterData);
router.post("/create", productController.create);
router.get("/:id", productController.search);
router.patch("/update", productController.update);
router.patch("/image", fileUpload(), productController.upload);
router.delete("/:id", productController.delete);
router.post("/createCart", productController.createCart);
router.post("/addQuantity", productController.quantityAdd);
router.post("/subQuantity", productController.quantitySub);





module.exports = router;