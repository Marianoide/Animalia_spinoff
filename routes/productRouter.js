const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
//const { body } = require('express-validator');
const productController = require('../controllers/productController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const multerFileFilter = (req, file, cb) => { 
    let ext = path.extname(file.originalname)
    let acceptedExtensions = ['.jpg', '.png', '.jpeg']
    if(!acceptedExtensions.includes(ext)) {
      return cb(null,false)
    }
    return cb(null,true)
  }
  //carga de variables entorno multer MARIANO

const upload = multer({ storage,fileFilter: multerFileFilter });


router.get('/', productController.catalogo);
router.get('/productCreate', productController.creacion);
router.get('/productDetail/:id', productController.detalle);
router.post('/productCreate',productController.almacenar); //post cambiado por mariano//
router.get('/productEdit/:id', productController.edicion);
router.put('/productEdit/:id', productController.actualizar);
router.delete('/delete/:id', productController.borrado);

module.exports = router;

