const path = require('path');
const productController = {

    detalle: (req, res, next) => {
        res.render('productDetail');
    },
    creacion: (req, res, next) => {
        res.render('productCreate');
    },
    edicion: (req, res, next) => {
        res.render('productEdit');
    }
};

module.exports = productController;