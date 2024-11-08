import express from 'express'
import MedService from '../service/meds_service.js'
import AuthMiddleware from "../middlewares/auth_middleware.js";
const auth = new AuthMiddleware();
const router = express.Router();
const svc = new MedService();


router.get('/:id', async (req, res) => {
    let response =  await svc.getMeds()
    if(response != null){
        if(response.success){
            return res.status(201).json(response)
        } else {
            return res.status(404).json(response.message);
        }
    } else{
        return res.status(500).json(response)
    }
});

// Get medicamento by ID
router.get('/:id', async (req, res) => {
    let response =  await svc.getMedicamentoById(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(201).json(response)
        } else {
            return res.status(404).json(response.message);
        }
    } else{
        return res.status(500).json(response)
    }
});

// Get medicamentos by category ID
router.get('/categoria/:idCategoria', async (req, res) => {
    const { limit, offset } = req.query; // Obtener limit y offset de la query string
    const parsedLimit = limit ? parseInt(limit) : null;
    const parsedOffset = offset ? parseInt(offset) : null;

    let response = await svc.getMedicamentoByCategory(req.params.idCategoria, parsedLimit, parsedOffset); // Pasar limit y offset
    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(404).json(response.message);
        }
    } else {
        return res.status(500).json(response);
    }
});

// Delete a medicamento by ID / Revisar
router.delete('/:id', async (req, res) => {
    let response = await svc.deleteMedicamentoById(req.params.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else {
            return res.status(404).json(response.message);
        }
    } else{
        return res.status(500).json(response)
    }
});

//Get medicamento by droga
router.get('/medicamento/:droga', async (req, res) => {
    let response = await svc.getMedicamentosByDroga(req.params.droga)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(404).json(response.message)
        }
    } else{
        return res.status(500).json(response)
    }
});

router.put('/:id', async (req, res) => {
    let response = await svc.putMedicamentoImage(req.body.url[0], req.params.id)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(404).json(response.message)
        }
    } else{
        return res.status(500).json(response)
    }
});

export default router;

