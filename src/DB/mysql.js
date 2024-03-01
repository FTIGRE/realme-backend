const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}
let conexion;

function conmysql() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log(err);
            setTimeout(conmysql, 200);
        } else {
            console.log('DB conectada')
        }
    });
    conexion.on('error', err => {
        console.log(err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conmysql();
        } else {
            throw err;
        }
    })
}
conmysql();
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT* FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function buscar(tabla, columna, valor) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ${columna} LIKE '%${valor}%'`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id=${data.id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}
function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

module.exports = {
    todos,
    uno,
    buscar,
    agregar,
    eliminar,
    query
}
