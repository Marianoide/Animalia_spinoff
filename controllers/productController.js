const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productController = {

    catalogo: (req, res, next) => {
        res.render('./products/products', {
            products
        });
    },

    detalle: (req, res, next) => {
        let productoBuscado = products.find(producto => {
            return producto.id == req.params.id
        })
        res.render("./products/productDetail", {
            producto: productoBuscado
        });
    },

    creacion: (req, res, next) => {
        res.render('./products/productCreate');
    },

    almacenar: (req, res, next) => {
        let image
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = "/images/default-image.jpg"
        }
        let nuevoProducto = {
            id: products[products.length - 1].id + 1,
            ...req.body,
            image: image
        }
        products.push(nuevoProducto)
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
        res.redirect("/products")
    },

    edicion: (req, res, next) => {
        let id = req.params.id
        let productToedit = products.find(element => { return element.id === parseInt(req.params.id) })
        res.render('./products/productEdit',{ product: productToedit });
    },

    actualizar: (req, res) => {
        let product = products.findIndex((element => {
            return element.id === parseInt(req.params.id)
          }))
          products[product].productName = req.body.productName === "" ? products[product].productName : req.body.productName;
          products[product].productCategory = req.body.productCategory === "" ? products[product].productCategory : req.body.productCategory;
          products[product].productSize = req.body.productSize === "" ? products[product].productSize : req.body.productSize;
          products[product].productPrice = req.body.productPrice === "" ? products[product].productPrice : parseInt(req.body.productPrice);
          products[product].productDescription = req.body.productDescription === "" ? products[product].productDescription : req.body.productDescription;
          products[product].priceDiscount = req.body.priceDiscount === "" ? products[product].priceDiscount : req.body.priceDiscount;
          // revisar cuando no cargo una imagen en el formulario genera un error, debo cargar siempre una imagen
          products[product].productImg = req.file.productImg === "" ? products[product].productImg : req.file.filename;
          fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
            res.redirect('/products/productDetail' + req.params.id)
        },


    borrado: (req, res, next) => {
        let id = req.params.id
        let productoABorrar = products.filter(product => product.id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(productoABorrar));
        res.redirect("/products")
    }

};

module.exports = productController;