import CategoryService from '../service/category_service.js'
import express from 'express'
const svc = new CategoryService();
const router = express.Router();

router.get(':/id', async (req, res) => {
    const array = await svc.getCategoryById(req.params.id)
    return res.status(array.status).json(array.datos)
})

export default router;