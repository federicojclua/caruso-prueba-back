const express = require('express');
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/api/products', validateProduct, productController.createProduct);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', productController.getProductById);
router.put('/api/products/:id', validateProduct, productController.updateProductById);
router.delete('/api/products/:id', productController.deleteProductById);

module.exports = router;
