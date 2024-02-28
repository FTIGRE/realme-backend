const TABLA = 'memberships';



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

    return {
        todos,
        uno,
        buscar,
        agregar,
        eliminar
    }
}