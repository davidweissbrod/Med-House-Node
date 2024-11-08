import express from 'express'
import AuthMiddleware from '../middlewares/auth_middleware.js'
import PreguntaService from '../service/preguntas_service.js'

const auth = new AuthMiddleware();
const router = express.Router();
const svc = new PreguntaService();

router.get('/', async (req, res) => {
    let response = await svc.getAllPreguntas();
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(401).json(response.message);
    }
})

router.get('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.getPreguntasById(req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json(response.message);
    }
})

router.post('/',  async (req, res) => {
    let response = await svc.submitPregunta(req.body);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(401).json(response.message);
    }
})

router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.deletePregunta(req.params.id);
    if (response.success) {
        return res.status(200).json(response);
    } else {
        return res.status(404).json(response.message);
    }
})

export default router;