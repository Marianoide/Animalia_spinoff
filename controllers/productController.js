const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {

    catalogo: (req, res, next) => {
        res.render('./products/products', {products} );
    },
    detalle: (req, res, next) => {
        let productoBuscado = products.find( producto => {
         return producto.id == req.params.id
        })
        res.render("./products/productDetail",{producto : productoBuscado});
     },
    creacion: (req, res, next) => {
        res.render('./products/productCreate');
    },
    edicion: (req, res, next) => {
        res.render('./products/productEdit');
    },
};

module.exports = productController;