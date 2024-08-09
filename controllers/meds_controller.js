import Medicamento from "../entities/Medicamento.js";
import express from 'express'
import MedService from '../service/meds_service.js'
import AuthMiddleware from "../middlewares/auth_middleware.js";
const auth = new AuthMiddleware();
const router = express.Router();
const med = new Medicamento();
const svc = new MedService();

// Get all medicamentos
router.get('/', async (req, res) => {
    let ret;
    const array =  await svc.getAllAsync()
    ret = res.status(array.status).send(array.message)
});

// Get medicamento by ID
router.get('/:id', async (req, res) => {
    let ret;
    const array =  await svc.getMedicamentosById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

// Get medicamentos by category ID
router.get('/categoria/:idCategoria', async (req, res) => {
    let ret;
    const array =  await svc.getMedicamentoByCategory(req.params.id)
    ret = res.status(array.status).send(array.message)
});

/*// Create a new medicamento
router.post('/', async (req, res) => {
    let ret;
    const array =  await svc.insertMedicamento(req.body.Medicamento)
    ret = res.status(array.status).send(array.message)
});

// Update a medicamento by ID
router.put('/:id', async (req, res) => {
    let ret;
    const array =  await svc.updateMedicamento(req.params.id)
    ret = res.status(array.status).send(array.message)
});*/

// Delete a medicamento by ID
router.delete('/:id', async (req, res) => {
    let ret;
    const array =  await svc.deleteMedicamentoById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

export default router;

