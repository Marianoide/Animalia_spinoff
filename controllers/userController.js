const fs = require('fs')
const path = require('path')
const { validationResult, body } = require('express-validator')
const bcryptjs = require('bcryptjs')
const User = require('../models/User')

let usersFilePath = path.join(__dirname, '../data/users.json')
let users = JSON.parse(fs.readFileSync(usersFilePath , 'utf-8'));


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

///// USER CREATE ////////////
create: (req, res) => {
    const resultValidation = validationResult(req)
    if (resultValidation.errors.length > 0) {
      return res.render('./users/register', {
        errors: resultValidation.mapped()
      })
    }
    let emailInUse = User.findByField('email', req.body.email);
    if (emailInUse) {
      return res.render('./users/register', {
        errors: {
          email: {
            msg: 'Este email tiene una cuenta activa en Animalia.'
          }
        }
      })
    }
    delete req.body.confirmPassword

    let userToCreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: req.file ? req.file.filename : 'default.png'
    }

    User.create(userToCreate);
    res.redirect('/users/register_success')
  };


module.exports = userController;