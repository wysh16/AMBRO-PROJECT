const express = require("express");
const customerController =require('../controllers/customer.controller');



const router = express.Router();

// API để lưu thông tin khách hàng
router.post('/save', customerController.saveCustomer);

module.exports = router;
