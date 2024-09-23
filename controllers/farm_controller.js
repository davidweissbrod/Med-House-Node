import FarmaceuticoService from '../service/farm_service.js'
import express from 'express';
import AuthMiddleware from '../middlewares/auth_middleware.js';
const router = express.Router();
const svc = new FarmaceuticoService();
const auth = new AuthMiddleware();

// Get a farmaceutico by ID
router.get('/farmaceutico/:id', async (req, res) => {
    let response =  await svc.getFarmaceuticoById(req.params.id)
    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response);
    }
});

// Update a farmaceutico 
router.put('/farmaceutico', auth.authMiddleware, async (req, res) => { 
    let response = await svc.updateFarmaceutico(req.body, req.params.id);
    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response);
    }
});

// Delete a farmaceutico by ID
router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response =  await svc.deleteFarmaceuticoById(req.params.id, req.user.id)
    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response);
    }
});

// Farm Login
router.post('/login', async (req, res) => {
    let response = await svc.login(req.body.dni, req.body.password);
    if(response != null){
        if(response.success){   
            return res.status(201).json(response);
        } 
        else {
            return res.status(400).json(response.message);
        }
    }
    else{
        return res.status(401).json(response);
    }
});
// Farm Register
router.post('/register', async (req, res) => {
    let response = await svc.register(req.body);
    if(response != null){
        if(response.success){   
            return res.status(201).json(response);
        } 
        else {
            return res.status(400).json(response.message);
        }
    }
    else{
        return res.status(401).json(response);
    }
});

export default router;