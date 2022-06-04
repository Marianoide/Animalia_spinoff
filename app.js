// Requieres
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

// Express
const app = express();

//Middlewares - Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')))
//app.use(express.urlencoded(( extended: false )));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));


// Motor de vistas
app.set("view engine", "ejs");

//Servidor levantado en puerto 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Servidor corriendo en el puerto 3000');
});

// Rutas
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

//404
/*app.get("*", (req, res) => {
    res.render(path.join(__dirname, "./views/404.ejs"));
});*/

// Exportar app
module.exports = app;