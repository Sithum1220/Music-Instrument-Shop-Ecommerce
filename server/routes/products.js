const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/add', authMiddleware('admin'), upload.single('image'), productController.addProduct);
router.get('/get', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authMiddleware('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware('admin'), productController.deleteProduct);

module.exports = router;
