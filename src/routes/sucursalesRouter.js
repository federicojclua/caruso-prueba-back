const express = require('express');
const router = express.Router();
const sucursalesController = require('../controllers/sucursalesController');

router.get('/:sucursales', sucursalesController.getSucursales);
router.post('/:sucursales', sucursalesController.createSucursal);

module.exports = router;
