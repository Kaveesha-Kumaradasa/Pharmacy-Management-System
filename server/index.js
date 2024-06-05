import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import medicineRoutes from './routes/med-admin.js';
import supplierRoutes from './routes/suppliers.js';
import billingRoutes from './routes/billing.js';
import cashierRoutes from './routes/med-cashier.js';
import notificationRoutes from './routes/notification.js'
import orderRoutes from './routes/orders.js';
import dashboardRoutes from './routes/dashboard.js';


const app = express();

app.use(express.json());
app.use(cors());

app.use('/server/users', userRoutes);
app.use('/server/auth', authRoutes);
app.use('/server/med-admin', medicineRoutes);
app.use('/server/suppliers',supplierRoutes);
app.use('/server/billing',billingRoutes);
app.use('/server/med-cashier',cashierRoutes);
app.use('/server/notification',notificationRoutes);
app.use('/server/orders',orderRoutes);
app.use('/server/dashboard',dashboardRoutes);


app.listen(8800, () => {
  console.log(`Server is running on port`);
});