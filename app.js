const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

// Disponibilidad de la carpeta public
app.use(express.static(path.resolve(__dirname, 'public')))

// Motor de vistas
app.set("view engine", "ejs");
/*app.set("views", [
    __dirname + "/views",
    __dirname + "/views/users",
    __dirname + "/views/products",
    __dirname + "/views/partials",
]);*/ ///Declaracion de carpetas de MAS///

//Servidor levantado en puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

// Rutas
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);


//404
/*app.get("*", (req, res) => {
    res.render(path.join(__dirname, "./views/404.ejs"));
});*/