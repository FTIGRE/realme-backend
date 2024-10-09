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

module.exports = {
    getClientwMembership
}