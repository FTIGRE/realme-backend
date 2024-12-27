const mysql = require('mysql');
const config = require('../config');
const cron = require('node-cron');

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
        if (err) {
            console.log(err);
            conmysql();
        }
    })
}
conmysql();

cron.schedule('0 0 * * *', async () => {
    try {
        const result = await new Promise((resolve, reject) => {
            conexion.query('UPDATE memberships SET state = "expired" WHERE state = "active" AND end_date < NOW()', (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
        console.log('Memberships updated:', result);
    } catch (error) {
        console.error('Error updating memberships:', error);
    }
});

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
        conexion.query(`DELETE FROM ${tabla} WHERE ${data.column}=${data.value}`, (error, result) => {
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
    conexion,
    todos,
    uno,
    buscar,
    agregar,
    eliminar,
    query
}