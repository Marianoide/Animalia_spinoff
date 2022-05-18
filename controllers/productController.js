const path = require('path');
const productController = {

    detalle: (req, res, next) => {
        res.render('./products/productDetail');
    },
    creacion: (req, res, next) => {
        res.render('./products/productCreate');
    },
    edicion: (req, res, next) => {
        res.render('./products/productEdit');
    }
};

module.exports = productController;