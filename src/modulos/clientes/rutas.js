const express = require('express');
const respuesta = require('../../red/respuestas');
const router = express.Router();
const controlador = require('./index');

router.get('/memberships/:state', getClientwMembership);
router.get('/debts/:id', getClientDebts);
router.get('/debts', getClientwDebt);
router.get('/:columna/:valor', buscar);
router.get('/:id', uno);
router.get('/', todos);
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

async function buscar(req, res, next) {
    try {
        const column = req.params.columna;
        const value = req.params.valor;
        const items = await controlador.buscar(column, value);
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
        req.io.emit('newClient');
        respuesta.success(req, res, mensaje, 200);
    } catch (error) {
        next(error);
    }
}
async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        req.io.emit('newClient');
        respuesta.success(req, res, 'Item eliminado', 200);
    } catch (error) {
        next(error);
    }
}

async function getClientwMembership(req, res, next) {
    try {
        const state = req.params.state;
        const items = await controlador.getClientwMembership(state);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

async function getClientwDebt(req, res, next) {
    try {
        const items = await controlador.getClientwDebt();
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

async function getClientDebts(req, res, next) {
    try {
        const items = await controlador.getClientDebts(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;