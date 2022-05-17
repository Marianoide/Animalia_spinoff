const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController')

router.get('/views/products/productDetail.ejs', productController.detalle);
router.get('/views/products/productCreate.ejs', productController.creacion);
router.get('/views/products/productEdit.ejs', productController.edicion);

module.exports = router;