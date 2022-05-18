const path = require('path');
const userController = {

    login: (req, res, next) => {
        res.render('./users/login');
    },
    registro: (req, res, next) => {
        res.render('./users/register');
    },
    carrito: (req, res, next) => {
        res.render('./users/cart');
    }
};

module.exports = userController;