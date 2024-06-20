const express = require("express");
const productController = require("../controllers/productController");
const validateProduct = require("../middlewares/validateProduct");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.use(cors());
router.use(bodyParser.json());
router.use('/uploads', express.static('uploads'));

router.post("/", validateProduct, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", validateProduct, productController.updateProductById);
router.delete("/:id", productController.deleteProductById);
router.post("/upload", upload.single("image"), productController.uploadImage);

module.exports = router;