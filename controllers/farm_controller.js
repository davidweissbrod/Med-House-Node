import FarmaceuticoService from '../service/farm_service'
import express from 'express';
const router = express.Router();
const svc = new FarmaceuticoService();

// Login y Register para farmacueticos en el futuro(?)

// Get all farmaceuticos
router.get('/', async (req, res) => {
    const array =  await svc.getAllAsync()
    return res.status(array.status).send(array.message)
});

// Get a farmaceutico by ID
router.get('/:id', async (req, res) => {
    const array =  await svc.getFarmaceuticoById(req.params.id)
    return res.status(array.status).send(array.message)
});

// Insert Farmaceutico
router.post('/', async (req, res) => {
    const array =  await insertFarmaceutico(req.body.Farmaceutico)
    return res.status(array.status).send(array.message)
});

// Update a farmaceutico by ID
router.put('/:id', async (req, res) => {
    const array =  await updateFarmaceuticoById(req.params.id)
    return res.status(array.status).send(array.message)
});

// Delete a farmaceutico by ID
router.delete('/:id', async (req, res) => {
    const array =  await deleteFarmaceuticoById(req.params.id)
    return res.status(array.status).send(array.message)
});

export default router;