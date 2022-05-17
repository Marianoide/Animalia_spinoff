const path = require('path');
const userController = {

    login: (req, res, next) => {
        res.render('login');
    },
    registro: (req, res, next) => {
        res.render('register');
    },
    carrito: (req, res, next) => {
        res.render('cart');
    }
};

module.exports = userController;