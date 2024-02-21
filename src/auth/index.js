const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
function asignarToken(data){
    return jwt.sign(data, secret);
}

function verificarToken(token){
    jwt.verify(token, secret);
}

const checkToken = {
    confirmarToken: function(req){
        const decodificado = decodificarCabecera(req);
    }
}

function obtenerToken(autorizacion){
    if (!autorizacion) {
        throw new Error('No viene token');
    }
    if (autorizacion.indexOf('Bearer')===-1) {
        throw new Error('Formato inválido');
    }
    let token = autorizacion.replace('Bearer ','');
    return token;
}


function decodificarCabecera(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    const decodificado=verificarToken(token);
    req.user = decodificado;
    return decodificado;
}

module.exports = {
    asignarToken,
    checkToken
}