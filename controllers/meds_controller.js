import Medicamento from "../entities/Medicamento";
import express from 'express'

const router = express.Router();
const med = new Medicamento();

// Get all medicamentos
router.get('/', async (req, res) => {
    try {
        const medicamentos = await med.getAllAsync();
        res.send(medicamentos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a medicamento by ID
router.get('/:id', async (req, res) => {
    try {
        const medicamento = await med.getMedicamentoById(req.params.id);
        if (!medicamento) return res.status(404).send();
        res.send(medicamento);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get medicamentos by category ID
router.get('/categoria/:idCategoria', async (req, res) => {
    try {
        const medicamentos = await med.getMedicamentosByCategoria(req.params.idCategoria);
        if (!medicamentos) return res.status(404).send();
        res.send(medicamentos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new medicamento
router.post('/', async (req, res) => {
    try {
        const medicamento = await insertMedicamento(new Medicamento(req.body.nombre, req.body.marca, req.body.dosis, req.body.formaFarm, req.body.droga, req.body.idCategoria, req.body.descripcion, req.body.stock))
        res.status(201).send(medicamento);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a medicamento by ID
router.put('/:id', async (req, res) => {
    try {
        const medicamento = await med.updateMedicamentoById(new Medicamento(req.body.nombre, req.body.marca, req.body.dosis, req.body.formaFarm, req.body.droga, req.body.idCategoria, req.body.descripcion, req.body.stock));
        if (!medicamento) return res.status(404).send();
        res.send(medicamento);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a medicamento by ID
router.delete('/:id', async (req, res) => {
    try {
        const medicamento = await med.deleteMedicamentoById(req.params.id);
        if (!medicamento) return res.status(404).send();
        res.send(medicamento);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;

