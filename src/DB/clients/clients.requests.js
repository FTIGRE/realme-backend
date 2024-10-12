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
        const query =
            `SELECT 
                clients.id,
                clients.name,
                purchases.debt
            FROM 
                clients
            INNER JOIN 
                purchases ON clients.id = purchases.client_id
            WHERE 
                purchases.debt > 0;`;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    getClientwMembership,
    getClientwDebt
}