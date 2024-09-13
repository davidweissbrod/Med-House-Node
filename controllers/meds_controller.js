import express from 'express'
import MedService from '../service/meds_service.js'
import AuthMiddleware from "../middlewares/auth_middleware.js";
const auth = new AuthMiddleware();
const router = express.Router();
const svc = new MedService();

// Get all medicamentos
router.get('/', async (req, res) => {
    let response = await svc.getAllMedicamentos()
    return res.status(201).json(response)
});

// Get medicamento by ID
router.get('/:id', async (req, res) => {
    let response =  await svc.getMedicamentoById(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(201).json(response)
        } else {
            return res.status(500).json(response.message);
        }
    } else{
        return res.status(401).json(response)
    }
});

// Get medicamentos by category ID
router.get('/categoria/:idCategoria', async (req, res) => {
    let response =  await svc.getMedicamentoByCategory(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(201).json(response)
        } else {
            return res.status(500).json(response.message);
        }
    } else{
        return res.status(401).json(response)
    }
});

// Delete a medicamento by ID / Revisar
router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.deleteMedicamentoById(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else {
            return res.status(400).json(response.message);
        }
    } else{
        return res.status(401).json(response)
    }
});

//Get medicamento by droga
router.get('/medicamento/:droga', async (req, res) => {
    let response = await svc.getMedicamentosByDroga(req.params.droga)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(500).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

export default router;

