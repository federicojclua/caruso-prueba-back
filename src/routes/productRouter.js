const express = require("express");
const {createProduct, getAllProducts, getProductById, updateProductById, deleteProductById} = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());


router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;