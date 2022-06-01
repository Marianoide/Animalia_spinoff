const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController')

router.get('/', productController.catalogo);
router.get('/productDetail', productController.detalle);
router.get('/productCreate', productController.creacion);
router.get('/productEdit', productController.edicion);

module.exports = router;