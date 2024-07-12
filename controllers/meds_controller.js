import Medicamento from "../entities/Medicamento";
import express from 'express'

const router = express.Router();
const med = new Medicamento();

// Get all medicamentos
router.get('/', async (req, res) => {
    let ret;
    const array =  await getAllAsync()
    ret = res.status(array.status).send(array.message)
});

// Get medicamento by ID
router.get('/:id', async (req, res) => {
    let ret;
    const array =  await getMedicamentosById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

// Get medicamentos by category ID
router.get('/categoria/:idCategoria', async (req, res) => {
    let ret;
    const array =  await getMedicamentoByCategory(req.params.idCategoria)
    ret = res.status(array.status).send(array.message)
});

// Create a new medicamento
router.post('/', async (req, res) => {
    let ret;
    const array =  await insertMedicamento(req.body.Medicamento)
    ret = res.status(array.status).send(array.message)
});

// Update a medicamento by ID
router.put('/:id', async (req, res) => {
    let ret;
    const array =  await updateMedicamento(req.params.id)
    ret = res.status(array.status).send(array.message)
});

// Delete a medicamento by ID
router.delete('/:id', async (req, res) => {
    let ret;
    const array =  await deleteMedicamentoById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

export default router;

