const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer');
const path = require('path');
const loginValidations = require('../middlewares/loginValidations');
const validations = require('../middlewares/registerValidations');
const guestMiddlewares = require('../middlewares/guestMiddleware');
const authMiddlewares = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

/* Config del Multer */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/uploads/users/avatars');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-userImg' + path.extname(file.originalname));
    },
  });

  /* Multer SEND */
  const upload = multer({ storage });

  /*Ruta del Login*/ //HAY QUE AGREGAR COMO 2DO PARAMETRO EL GUESTMIDDLEWARE
router.get('/login', userController.login);
//router.post('./users/login',userController.loginValidations);

/*Ruta del Logout */ //HAY QUE AGREGAR COMO 2DO PARAMETRO EL GUESTMIDDLEWARE
//router.get('/logout', usersController.logout)

/* Register */
router.get('/register', userController.registro);
// router.post('./user/register', upload.single('avatar'), validations, userController.create);
//router.get('/register/success', userController.registerSuccessful);

/*hay que crear vista de profile a futuro*/



router.get('/cart', userController.carrito);
router.get('/register', userController.registro);

module.exports = router;