import Express from "express";
import BolsaService from '../service/bolsa_service.js';
import AuthMiddleware from '../middlewares/auth_middleware.js';
const auth = new AuthMiddleware();
const router = Express.Router();
const svc = new BolsaService();

router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getUserBolsa(req.user.id)
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

router.get('/check/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.checkMedInBolsa(req.user.id, req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json(response);
    }
});

router.post('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.postMedBolsa(req.user.id, req.params.id)
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
    let response = await svc.deleteMedBolsa(req.user.id, req.params.id)
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
