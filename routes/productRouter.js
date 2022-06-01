const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/productController')

router.get('/', productController.catalogo);
router.get('/productDetail/:id', productController.detalle);
router.get('/productCreate', productController.creacion);
router.get('/productEdit/:id', productController.edicion);

module.exports = router;

//****FORM CREACION DE LOS PRODUCTOS****//
//router.get('/nuevo', productController.creacion);

//****ACCION DE CREACION DE PRODUCTO(DONDE SE ENVIA EL FORMULARIO****//
//router.post('/',  upload.single('image'), productController.store);

//****FORM EDICION DE LOS PRODUCTOS****//
//router.get('/:id/editar', productsController.edicion);

//****ACCION DE EDICION DE LOS PRODUCTOS****//
//router.put('/:id', upload.single('image'), productsController.edicion);

//****ACCION DE BORRADO DE LOS PRODUCTOS****//
//router.delete('/:id', productController.destroy);