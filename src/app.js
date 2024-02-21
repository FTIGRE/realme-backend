const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const membresias = require('./modulos/membresias/rutas');
const productos = require('./modulos/productos/rutas');
const compras = require('./modulos/compras/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/errors');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/membresias', membresias);
app.use('/api/productos', productos);
app.use('/api/compras', compras);
app.use('/api/auth', auth);
app.use(error);
module.exports = app;