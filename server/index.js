import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import medicineRoutes from './routes/med-admin.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/server/users', userRoutes);
app.use('/server/auth', authRoutes);
app.use('/server/med-admin', medicineRoutes);

app.listen(8800, () => {
  console.log(`Server is running on port`);
});
