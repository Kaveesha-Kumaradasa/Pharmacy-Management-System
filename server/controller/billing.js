import { db } from '../db.js';

// Function to get product ID from product name
const getProductId = (productName, callback) => {
  db.query('SELECT product_id FROM product WHERE product_name = ?', [productName], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      if (results.length > 0) {
        callback(null, results[0].product_id);
      } else {
        callback(new Error('Product not found'), null);
      }
    }
  });
};

// Create a new bill
export const createBill = (req, res) => {
  const { date, bill_total, customer_name, user_id, products } = req.body;

  try {
    // Get product ID for each item
    const productsWithIds = products.map((product, index) => {
      return new Promise((resolve, reject) => {
        getProductId(product.product_name, (err, productId) => {
          if (err) {
            console.error(`Error getting product ID for product at index ${index}:`, err);
            resolve(null);
          } else {
            resolve({ ...product, product_id: productId });
          }
        });
      });
    });

    // Wait for all product ID promises to resolve
    Promise.all(productsWithIds)
      .then((validItems) => {
        // Filter out items with null product_id (products not found)
        const filteredItems = validItems.filter(item => item !== null);

        // Check if filteredItems is empty
        if (filteredItems.length === 0) {
          return res.status(400).json({ error: 'No valid products found to create bill' });
        }

        // Start transaction
        db.beginTransaction((err) => {
          if (err) throw err;

          // Insert bill details
          const billQuery = 'INSERT INTO bill (date, bill_total, customer_name, user_id) VALUES (?, ?, ?, ?)';
          db.query(billQuery, [date, bill_total, customer_name, user_id], (err, billResult) => {
            if (err) {
              db.rollback(() => {
                console.error('Error inserting bill details:', err);
                res.status(500).json({ error: 'An error occurred while creating bill' });
              });
            } else {
              const billId = billResult.insertId;

              // Prepare bill items values
              const values = filteredItems.map(item => [billId, item.product_id, item.quantity, item.total]);

              // Insert bill items (products)
              const billItemsQuery = 'INSERT INTO bill_product (bill_id, product_id, bill_quantity, total) VALUES ?';
              db.query(billItemsQuery, [values], (err) => {
                if (err) {
                  db.rollback(() => {
                    console.error('Error inserting bill items:', err);
                    res.status(500).json({ error: 'An error occurred while creating bill' });
                  });
                } else {
                  // Update product quantities in the inventory
                  filteredItems.forEach(item => {
                    const updateQuantityQuery = 'UPDATE product SET quantity = quantity - ? WHERE product_id = ?';
                    db.query(updateQuantityQuery, [item.quantity, item.product_id], (err) => {
                      if (err) {
                        db.rollback(() => {
                          console.error('Error updating product quantity:', err);
                          res.status(500).json({ error: 'An error occurred while creating bill' });
                        });
                      }
                    });
                  });

                  // Get the cashier name
                  const getCashierNameQuery = 'SELECT name FROM users WHERE role_id = 2';
                  db.query(getCashierNameQuery, [user_id], (err, userResult) => {
                    if (err) {
                      db.rollback(() => {
                        console.error('Error fetching cashier name:', err);
                        res.status(500).json({ error: 'An error occurred while creating bill' });
                      });
                    } else {
                      const cashierName = userResult[0].name;

                      // Commit transaction
                      db.commit((err) => {
                        if (err) {
                          db.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'An error occurred while creating bill' });
                          });
                        } else {
                          res.json({ message: 'Bill created successfully', cashier_name: cashierName });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        });
      })
      .catch((error) => {
        console.error('Error creating bill:', error);
        res.status(500).json({ error: 'An error occurred while creating bill' });
      });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'An error occurred while creating bill' });
  }
};

// Get products based on search query
export const getProducts = (req, res) => {
  const { name } = req.query;
  db.query('SELECT product_id, product_name, exp_date, sell_price, quantity AS available_quantity FROM product WHERE product_name LIKE ?', [`%${name}%`], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

