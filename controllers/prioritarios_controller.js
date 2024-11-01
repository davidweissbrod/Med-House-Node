import express from "express";
import AuthMiddleware from '../middlewares/auth_middleware.js';
import PrioritariosService from '../service/prioritarios_service'

const auth = new AuthMiddleware();
const router = express.Router();
const svc = new PrioritariosService();

router.get('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.getPrioritariosById(req.user.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
});

router.post('/', auth.authMiddleware, async (req, res) => {
    let res = await svc.postNewPrioritario(req.body)
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})

router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let res = await svc.deletePrioritario(req.params.id)
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})