import express from 'express'
import AuthMiddleware from '../middlewares/auth_middleware.js';
import PedidosService from '../service/pedidos_service.js';
const svc = new PedidosService();
const router = express.Router();
const auth = new AuthMiddleware();

router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllRequests(req.user.id)
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

router.get('/:id', async (req, res) => {
    let response = await svc.getRequestById(req.params.id)
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

router.post('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.postRequest(req.user.id)
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
    let response = await svc.deleteRequest(req.user.id, req.params.id)
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