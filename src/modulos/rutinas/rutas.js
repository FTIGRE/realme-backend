const express = require('express');
const respuesta = require('../../red/respuestas');
const router = express.Router();
const controlador = require('./index');

router.get('/', todos);
router.get('/:id', uno);
router.put('/', eliminar);
router.post('/', agregar);

async function todos(req, res, next) {
    try {
        const items = await controlador.todos();
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);
        if (req.body.id == 0) {
            mensaje = 'Item creado'
        } else {
            mensaje = 'Item actualizado'
        }
        req.io.emit('newRoutine');
        respuesta.success(req, res, mensaje, 200);
    } catch (error) {
        next(error);
    }
}
async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        req.io.emit('newRoutine');
        respuesta.success(req, res, 'Item eliminado', 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;