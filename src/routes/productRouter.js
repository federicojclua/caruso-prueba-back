const express = require("express");
const {
	createProduct, 
	getAllProducts, 
	getProductById, 
	updateProductById, 
	deleteProductById
} = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());
router.use(fileUpload({
	useTempFiles: true,
	tempFileDir: './uploads/'
}));

router.post("/new", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;