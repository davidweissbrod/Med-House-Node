import express from "express";
import AuthMiddleware from '../middlewares/auth_middleware.js';
import NecesitadoService from '../service/necesitado_service.js';  // Asegúrate de crear este servicio

const auth = new AuthMiddleware();
const router = express.Router();
const svc = new NecesitadoService();

// Get all Necesitados
router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllNecesitados(req.user.id);

    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response.message);
    }
});

// Add Necesitado
router.post('/', auth.authMiddleware, async (req, res) => {
    const { idMedicamento } = req.body;

    let response = await svc.addNecesitado(req.user.id, idMedicamento);

    if (response != null) {
        if (response.success) {
            return res.status(201).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response.message);
    }
});

// Remove Necesitado
router.delete('/', auth.authMiddleware, async (req, res) => {
    const { idMedicamento } = req.body;

    let response = await svc.removeNecesitado(req.user.id, idMedicamento);

    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response.message);
        }
    } else {
        return res.status(401).json(response.message);
    }
});

export default router;