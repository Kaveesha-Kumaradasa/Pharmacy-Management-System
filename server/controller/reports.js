import { db } from '../db.js';


// Controller for Top 3 Sold Items
export const getTop3Items = (req, res) => {
    const { year, month } = req.query;
    const query = `
        SELECT p.product_name, SUM(bp.bill_quantity) AS total_quantity
        FROM bill_product bp
        JOIN bill b ON bp.bill_id = b.bill_id
        JOIN product p ON bp.product_id = p.product_id
        WHERE YEAR(b.date) = ? AND MONTH(b.date) = ?
        GROUP BY p.product_name
        ORDER BY total_quantity DESC
        LIMIT 3
    `;
    db.query(query, [year, month], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};


// Controller for Expiring Medicines
export const getExpiringMedicines = (req, res) => {
    const query = `
        SELECT product_name, exp_date
        FROM product
        WHERE exp_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 MONTH)
        ORDER BY exp_date ASC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};
