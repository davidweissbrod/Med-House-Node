import Farmaceutico from '../entities/Farmaceutico';
import express from 'express';
const router = express.Router();
const farm = new Farmaceutico();

// Get all farmaceuticos
router.get('/', async (req, res) => {
    try {
        const farmaceuticos = await farm.getAllAsync();
        res.send(farmaceuticos);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a farmaceutico by ID
router.get('/:id', async (req, res) => {
    try {
        const farmaceutico = await farm.getFarmaceuticoById(req.params.id);
        if (!farmaceutico) return res.status(404).send('No se encontro el id');
        res.send(farmaceutico);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Insert Farmaceutico
router.post('/', async (req, res) => {
    try {
        const farmaceutico = await farm.insertFarmaceutico(new Farmaceutico(req.body.dni, req.body.nombre, req.body.apellido, req.body.titulo, req.body.contraseña, req.body.email, req.body.genero, req.body.fotoPerfil, req.body.fechaNacimiento, req.body.telefono))
        if(!farmaceutico)
        res.status(201).send(farmaceutico);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Update a farmaceutico by ID
router.put('/:id', async (req, res) => {
    try {
        const farmaceutico = await farm.updateFarmaceuticoById(new Farmaceutico(req.body.dni, req.body.nombre, req.body.apellido, req.body.titulo, req.body.contraseña, req.body.email, req.body.genero, req.body.fotoPerfil, req.body.fechaNacimiento, req.body.telefono));
        if (!farmaceutico) return res.status(404).send();
        res.send(farmaceutico);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a farmaceutico by ID
router.delete('/:id', async (req, res) => {
    try {
        const farmaceutico = await farm.deleteFarmaceuticoById(req.params.id);
        if (!farmaceutico) return res.status(404).send();
        res.send(farmaceutico);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;