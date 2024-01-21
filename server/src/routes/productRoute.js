const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addProducts, updateProduct, getProducts, deleteProduct } = require('../controllers/productControllers/productController');

router.post('/add-product', addProducts);
router.get('/get-product', getProducts);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);


module.exports = router;