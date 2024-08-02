import FarmaceuticoService from '../service/farm_service'
import express from 'express';
import AuthMiddleware from '../middlewares/auth_middleware';
import Farmaceutico from '../entities/Farmaceutico'
const router = express.Router();
const svc = new FarmaceuticoService();
const auth = new AuthMiddleware();
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

// Farm Login
router.post('/api/farmaceutico/login', auth.authMiddleware, async (req, res) => {
    let ret; 
    const array = await svc.login(req.body.dni, req.body.constraseña)
    if(array.success){   
        ret = res.status(201).json(array)
    } else{
        ret = res.status(400).json(array)
    }
    return ret;
})

// Farm Register
router.post('api/user/resgister', auth.authMiddleware, async (req, res) => {
    let ret = await svc.register(new Farmaceutico (1, req.body.dni, req.body.nombre, req.body.apellido, req.body.titulo, req.body.constraseña, req.body.email, req.body.genero, req.body.fotoPerfil, req.body.fechaNacimiento, req.body.telefono))
    if(ret){
        ret = res.status(201).send('Creado')
    } else{
        ret = res.status(400).send('No se pudo crear el usuario')
    }
    return ret
})

// Get DNI  y Contraseña
router.get('', async (req, res) => {
    const array = await getFarmByDniPassword(req.body.dni, req.body.contraseña)
    return res.status(array.status).send(array.message)
})

export default router;