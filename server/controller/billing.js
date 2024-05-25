import {db} from '../db.js';

export const addInvoice = async (req, res) => {
    const { customer_name, total_amount, user_id, products } = req.body;
    const date = new Date().toISOString().slice(0, 10);

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [result] = await connection.execute('INSERT INTO bill (date, customer_name, total_amount, user_id) VALUES (?, ?, ?, ?)', [date, customer_name, total_amount, user_id]);
        const bill_id = result.insertId;

        let productQueries = products.map(async product => {
            const [rows] = await connection.execute('SELECT quantity FROM product WHERE id = ?', [product.product_id]);
            if (rows[0].quantity < product.quantity) {
                throw new Error('Insufficient stock');
            }

            await connection.execute('INSERT INTO bill_product (bill_id, product_id, quantity) VALUES (?, ?, ?)', [bill_id, product.product_id, product.quantity]);
            await connection.execute('UPDATE product SET quantity = quantity - ? WHERE id = ?', [product.quantity, product.product_id]);
        });

        await Promise.all(productQueries);
        await connection.commit();
        res.send({ success: true, bill_id });
    } catch (err) {
        await connection.rollback();
        res.status(500).send(err.message);
    } finally {
        connection.release();
    }
};

export const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { customer_name, total_amount, user_id, products } = req.body;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [currentProducts] = await connection.execute('SELECT * FROM bill_product WHERE bill_id = ?', [id]);

        let productQueries = products.map(async product => {
            let currentProduct = currentProducts.find(p => p.product_id === product.product_id);
            let quantityDifference = product.quantity - (currentProduct ? currentProduct.quantity : 0);

            const [rows] = await connection.execute('SELECT quantity FROM product WHERE id = ?', [product.product_id]);
            if (rows[0].quantity < quantityDifference) {
                throw new Error('Insufficient stock');
            }

            if (currentProduct) {
                await connection.execute('UPDATE bill_product SET quantity = ? WHERE bill_id = ? AND product_id = ?', [product.quantity, id, product.product_id]);
                await connection.execute('UPDATE product SET quantity = quantity + ? WHERE id = ?', [-quantityDifference, product.product_id]);
            } else {
                await connection.execute('INSERT INTO bill_product (bill_id, product_id, quantity) VALUES (?, ?, ?)', [id, product.product_id, product.quantity]);
                await connection.execute('UPDATE product SET quantity = quantity - ? WHERE id = ?', [product.quantity, product.product_id]);
            }
        });

        await Promise.all(productQueries);
        await connection.execute('UPDATE bill SET customer_name = ?, total_amount = ?, user_id = ? WHERE bill_id = ?', [customer_name, total_amount, user_id, id]);
        await connection.commit();
        res.send({ success: true });
    } catch (err) {
        await connection.rollback();
        res.status(500).send(err.message);
    } finally {
        connection.release();
    }
};

export const getAllInvoices = async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM bill ORDER BY bill_id DESC, date DESC');
        res.send(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getInvoiceById = async (req, res) => {
    const { id } = req.params;

    try {
        const [billResults] = await db.execute('SELECT * FROM bill WHERE bill_id = ?', [id]);
        const [productResults] = await db.execute('SELECT * FROM bill_product WHERE bill_id = ?', [id]);
        res.send({ bill: billResults[0], products: productResults });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const getInvoicesByDate = async (req, res) => {
    const { date } = req.body;

    try {
        const [results] = await db.execute('SELECT * FROM bill WHERE date = ? ORDER BY bill_id DESC, date DESC', [date]);
        res.send(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export const deleteInvoice = async (req, res) => {
    const { id } = req.params;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const [products] = await connection.execute('SELECT * FROM bill_product WHERE bill_id = ?', [id]);

        let productQueries = products.map(async product => {
            await connection.execute('UPDATE product SET quantity = quantity + ? WHERE id = ?', [product.quantity, product.product_id]);
        });

        await Promise.all(productQueries);
        await connection.execute('DELETE FROM bill_product WHERE bill_id = ?', [id]);
        await connection.execute('DELETE FROM bill WHERE bill_id = ?', [id]);
        await connection.commit();
        res.send({ success: true });
    } catch (err) {
        await connection.rollback();
        res.status(500).send(err.message);
    } finally {
        connection.release();
    }
};
