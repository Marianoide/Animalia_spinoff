const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController')

router.get('/views/users/login.ejs', userController.login);
router.get('/views/users/cart.ejs', userController.carrito);
router.get('/views/users/register.ejs', userController.registro);

module.exports = router;