const express = require('express');
const { createReserva, getReservas } = require('../controllers/reservaController');

const router = express.Router();

router.post('/reservas', createReserva);

router.get('/reservas', getReservas);

module.exports = router;
