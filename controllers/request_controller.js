import express from "express";
import AuthMiddleware from '../middlewares/auth_middleware.js';
import RequestService from '../service/request_service.js';

const auth = new AuthMiddleware();
const router = express.Router();
const svc = new RequestService();

router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllRequests(req.user.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
});

router.get('/farm', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllFarmRequests(req.user.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
});

router.get('/pendant', async (req, res) => {
    let response = await svc.getAllPendantRequests();
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
});

router.get('/:id', async (req, res) => {
    let response = await svc.getRequestById(req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
});

// Crear una nueva solicitud
router.post('/', auth.authMiddleware, async (req, res) => {
    const requestData = req.body;
    let response = await svc.addRequest(req.user.id, requestData);
    if (response.success) {
        return res.status(201).json(response);
    } else {
        return res.status(400).json(response.message);
    }
});

// Actualizar una solicitud
router.put('/:id', auth.authMiddleware, async (req, res) => {
    const requestData = req.body;
    requestData.id = req.params.id;

    let response = await svc.updateRequest(req.user.id, requestData);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(400).json(response.message);
    }
});

// Eliminar una solicitud
router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.removeRequest(req.user.id, req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json(response.message);
    }
});

export default router;