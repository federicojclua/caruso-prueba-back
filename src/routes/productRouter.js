const express = require('express');
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateProduct, productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;
