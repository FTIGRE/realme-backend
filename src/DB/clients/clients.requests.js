const db = require('../mysql');

function getClientwMembership(state) {
    return new Promise((resolve, reject) => {
        const query =
            `SELECT clients.*, memberships.state
            FROM clients
            INNER JOIN memberships ON clients.id = memberships.client_id
            WHERE memberships.state = '${state}';`;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function getClientwDebt() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                clients.id,
                clients.name,
                SUM(purchases.debt) AS total_debt
            FROM 
                clients
            INNER JOIN 
                purchases ON clients.id = purchases.client_id
            WHERE 
                purchases.debt > 0
            GROUP BY 
                clients.id, clients.name;
        `;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function getClientDebts(id) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                purchases.id AS purchase_id,
                purchases.debt,
                purchases.p_date
            FROM 
                purchases
            WHERE 
                purchases.client_id = ${id} AND purchases.debt > 0;
        `;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    getClientwMembership,
    getClientwDebt,
    getClientDebts
}