import express from "express";
import { getGenerics,createGeneric,getCategories,createCategory,getDosageTypes,createDosageType,getBrands,createBrand,updateGeneric,updateCategory,updateDosageType,updateBrand } from "../controller/others.js";

const router = express.Router();

router.get('/generics', getGenerics);
router.post('/generics', createGeneric);
router.put('/generics/:id', updateGeneric);

router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);

router.get('/dosage-types', getDosageTypes);
router.post('/dosage-types', createDosageType);
router.put('/dosage-types/:id', updateDosageType);

router.get('/brands', getBrands);
router.post('/brands', createBrand);
router.put('/brands/:id', updateBrand);


export default router;