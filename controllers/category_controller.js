import CategoryService from '../service/category_service'
import express from 'express'
const svc = new CategoryService();
const router = express.Router();

router.get(':/id', async (req, res) => {
    const array = await getCategoryById(req.params.id)
    return res.status(array.status).json(array.datos)
})

export default router;