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

function getMonthlySummary(month, year) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                MONTH(purchases.p_date) AS month,
                YEAR(purchases.p_date) AS year,
                COALESCE(SUM(purchases.quantity * products.price), 0) AS total
            FROM
                purchases
            INNER JOIN
                products ON purchases.product_id = products.id
            WHERE
                MONTH(purchases.p_date) = ${month}
                AND YEAR(purchases.p_date) = ${year}
            GROUP BY
                MONTH(purchases.p_date),
                YEAR(purchases.p_date);
        `;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function getDailySummary(date) {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT
                (SELECT COALESCE(SUM((purchases.quantity * products.price) - IFNULL(purchases.debt, 0)), 0)
                 FROM purchases
                 INNER JOIN products ON purchases.product_id = products.id
                 WHERE p_date = '${date}' AND purchases.method = 'transfer') AS total_transfer,
                (SELECT COALESCE(SUM((purchases.quantity * products.price) - IFNULL(purchases.debt, 0)), 0)
                 FROM purchases
                 INNER JOIN products ON purchases.product_id = products.id
                 WHERE p_date = '${date}' AND purchases.method = 'cash') AS total_cash
        `;
        db.conexion.query(query, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports = {
    getSalesDetails,
    getMonthlySummary,
    getDailySummary
}