const express = require('express');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const ctrlAuth = require('../../auth/index');
const router = express.Router();
const seguridad = require('../../seguridad');

router.post('/login', login);
router.post('/verifyJWT', verifyJWT);

async function login(req, res, next) {
    try {
        const token = await controlador.login(req.body.user, req.body.password);
        respuesta.success(req, res, token, 200);
    } catch (error) {
        next(error);
    }
}

async function verifyJWT(req, res, next) {
    try {
        const token = req.body.token;
        const decodificado = ctrlAuth.verificarToken(token);
        respuesta.success(req, res, decodificado, 200);
    } catch (error) {
        next(error);
    }
}
module.exports = router;