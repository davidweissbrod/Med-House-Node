import CategoryService from '../service/category_service.js'
import express from 'express'
const svc = new CategoryService();
const router = express.Router();

router.get('/', async (req, res) => {
    let response = await svc.getAllCategories()
    if(response.success != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response)
        }
    } else{
        return res.status(401).json(response)
    }
})


router.get(':/id', async (req, res) => {
    let response = await svc.getCategoryById(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response)
        }
    } else{
        return res.status(401).json(response)
    }
})

export default router;