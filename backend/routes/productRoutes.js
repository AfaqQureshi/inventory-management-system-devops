const express = require("express");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} = require("../controllers/productController");

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/low-stock", getLowStockProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;