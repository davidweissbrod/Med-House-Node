import express from 'express'
import AuthMiddleware from '../middlewares/auth_middleware.js';
import BusquedaService from '../service/busqueda_service.js';
const svc = new BusquedaService();
const router = express.Router();
const auth = new AuthMiddleware();

router.get('/:query', async (req, res) => {
    let response = await svc.getMeds(req.params.query)
    if(response.success != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllSearch(req.user.id)
    if(response.success != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.post('/:query', auth.authMiddleware, async (req, res) => {
    let response = await svc.saveSearch(req.user.id, req.params.query)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.deleteSearchById(req.user.id, req.params.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.delete('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.deleteAllSearch(req.user.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

export default router;