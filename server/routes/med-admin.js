import express from 'express';
import { getCategories,
    getDosageTypes,
    getBrands,
    getGenerics,
    getSuppliers,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts } from '../controller/med-admin.js';

const router = express.Router();

router.get('/product/categories', getCategories);
router.get('/product/dosage-types', getDosageTypes);
router.get('/product/brands', getBrands);
router.get('/product/generics', getGenerics);
router.get('/product/suppliers', getSuppliers);
router.get('/product/:product_id', getProductById);
router.post('/product', createProduct);
router.put('/product/:product_id', updateProduct);
router.delete('/product/:product_id', deleteProduct);
router.get('/product', getAllProducts);

export default router;
