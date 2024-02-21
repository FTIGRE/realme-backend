const TABLA = 'users';
const auth = require('../auth');


module.exports = function (dbInyectada) {

    let db = dbInyectada;
    if (!db) {
        db = require('../../DB/mysql');
    }

    function todos() {
        return db.todos(TABLA);
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    async function agregar(body) {
        const user = {
            id: body.id,
            name: body.name,
            active: body.active
        }
        const respuesta = await db.agregar(TABLA, user);
        var insertId = 0;
        if (body.id == 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }
        var respuesta2 = '';
        if (body.user || body.password) {
            respuesta2 = await auth.agregar({
                id: insertId,
                user: body.user,
                password: body.password
            })
        }

        return respuesta2;
    }

    function eliminar(body) {
        return db.eliminar(TABLA, body);
    }

    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}