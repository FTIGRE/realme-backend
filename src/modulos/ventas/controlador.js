const TABLA = 'purchases';
const salesReqs = require('../../DB/clients/sales.requests');



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

    function getSalesDetails(date) {
        return salesReqs.getSalesDetails(date);
    }

    return {
        todos,
        uno,
        buscar,
        agregar,
        eliminar,
        getSalesDetails
    }
}