import express from 'express'
import AuthMiddleware from '../middlewares/auth_middleware'
import PreguntaService from '../service/preguntas_service'

const auth = new AuthMiddleware();
const router = express.Router();
const svc = new PreguntaService();

router.get('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.getAllPreguntas();
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})

router.get('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.getPreguntasById(req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})

router.post('/', auth.authMiddleware, async (req, res) => {
    let response = await svc.submitPregunta(req.body);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})

router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.deletePregunta(req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(response.status).json(response.message);
    }
})
