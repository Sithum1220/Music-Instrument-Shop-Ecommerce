const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/placeOrder', authMiddleware('customer', 'admin'), orderController.placeOrder);
router.get('/get', authMiddleware('admin'), orderController.getAllOrders);
router.put('/put/:orderId', authMiddleware('admin'), orderController.updatestatus);


module.exports = router;
