const { json } = require('express');
const path = require('path');
const fs = require('fs');

const productFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));

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
            image = "/images/default-image.jpeg"
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
        let product = products.find(product => product.id == id)
        res.render('./products/productEdit');
    },

    actualizar: (req, res) => {
        let id = req.params.id
        let productToEdit = products.find(product => product.id == id)
        console.log("🚀 ~ archivo: productsController.js ~ req.files", req.files)
        let image
        if (req.files[0] != undefined) {
            image = req.files[0].filename
        } else {
            image = productToEdit.image
        }
        productToEdit = {
            id: productToEdit.id,
            ...req.body,
            image: image,
        }
        let newProduct = products.map(product => {
            if (product.id == productToEdit.id) {
                return product = {
                    ...productToEdit
                };
            }
            return product
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(newProduct));
        res.redirect("/views/products/productDetail.ejs" + productToEdit.id)
    },

    borrado: (req, res, next) => {
        let id = req.params.id
        let productoABorrar = products.filter(product => product.id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(productoABorrar));
        res.redirect("/")
    }

};

module.exports = productController;