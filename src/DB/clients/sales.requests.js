const db = require('../mysql');

function getSalesDetails(date) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            purchases.id,
            purchases.quantity,
            purchases.method,
            purchases.debt,
            products.name AS product_name,
            clients.name AS client_name,
            (purchases.quantity * products.price) AS total
            FROM 
            purchases
            INNER JOIN 
            products ON purchases.product_id = products.id
            INNER JOIN 
            clients ON purchases.client_id = clients.id
            WHERE 
            purchases.p_date = '${date}';
        `;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    getSalesDetails
}