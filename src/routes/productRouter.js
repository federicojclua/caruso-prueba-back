const express = require('express');
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/products', validateProduct, productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', validateProduct, productController.updateProductById);
router.delete('/products/:id', productController.deleteProductById);

module.exports = router;
