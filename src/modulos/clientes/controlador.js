const TABLA = 'clients';
const clientReqs = require('../../DB/clients/clients.requests');

module.exports = function (dbInyectada) {

    let db = dbInyectada;
    if(!db){
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(TABLA);
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    function buscar(columna, valor) {
        return db.buscar(TABLA, columna, valor);
    }

    function agregar(body) {
        return db.agregar(TABLA, body);
    }

    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    function getClientwMembership(state) {
        return clientReqs.getClientwMembership(state);
    }

    return {
        todos,
        uno,
        buscar,
        agregar,
        eliminar,
        getClientwMembership
    }
}