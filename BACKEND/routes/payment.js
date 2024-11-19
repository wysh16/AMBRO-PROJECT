// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// POST: Xác nhận thanh toán
router.post('/', paymentController.confirmPayment);

module.exports = router;
