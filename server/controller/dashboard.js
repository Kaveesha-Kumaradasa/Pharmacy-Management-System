// controllers/dashboardController.js
import { db } from '../db.js';

export const getTotals = (req, res) => {
  db.query('SELECT COUNT(*) as totalProducts FROM product', (err, totalProducts) => {
    if (err) {
      console.error('Error fetching total products:', err);
      return res.status(500).send('Server error');
    }
    db.query('SELECT COUNT(*) as totalCategories FROM category', (err, totalCategories) => {
      if (err) {
        console.error('Error fetching total categories:', err);
        return res.status(500).send('Server error');
      }
      db.query('SELECT COUNT(*) as totalBrands FROM brand', (err, totalBrands) => {
        if (err) {
          console.error('Error fetching total brands:', err);
          return res.status(500).send('Server error');
        }
        res.json({
          totalProducts: totalProducts[0].totalProducts,
          totalCategories: totalCategories[0].totalCategories,
          totalBrands: totalBrands[0].totalBrands
        });
      });
    });
  });
};

export const getTopSelling = (req, res) => {
  const query = `
    SELECT p.product_name, SUM(bp.bill_quantity) as totalQuantity 
    FROM bill_product bp 
    JOIN product p ON bp.product_id = p.product_id 
    GROUP BY p.product_name
    ORDER BY totalQuantity DESC 
    LIMIT 3
  `;
  db.query(query, (err, topSelling) => {
    if (err) {
      console.error('Error fetching top selling:', err);
      return res.status(500).send('Server error');
    }
    res.json(topSelling);
  });
};

export const getMonthlySales = (req, res) => {
  const query = `
    SELECT MONTH(b.date) as month, SUM(bp.total) as totalSales 
    FROM bill b 
    JOIN bill_product bp ON b.bill_id = bp.bill_id 
    GROUP BY MONTH(b.date) 
    ORDER BY MONTH(b.date)
  `;
  db.query(query, (err, monthlySales) => {
    if (err) {
      console.error('Error fetching monthly sales:', err);
      return res.status(500).send('Server error');
    }
    const formattedSales = monthlySales.map(sale => ({
      month: sale.month,
      totalSales: sale.totalSales
    }));
    res.json(formattedSales);
  });
};
