import UserService from '../service/user_service.js'
import Usuario from '../entities/Usuario.js'
import express from "express"
import AuthMiddleware from '../middlewares/auth_middleware.js';
const auth = new AuthMiddleware();
const router = express.Router();
const svc = new UserService();


// Get user by ID
router.get('/:id', async (req, res) => {
    const array = await svc.getUserById(req.params.id);
    return res.status(array.status).json(array.datos);
});

// Update user
router.put('/:id', auth.authMiddleware, async (req, res) => { 
    const array = await svc.updateUser(req.params.id, req.body.Usuario); 
    return res.status(array.status).send(array.message);
});

// Insert User
router.post('', async (req, res) => {
    const array = await svc.insertUser(req.body.Usuario);
    return res.status(array.status).json(array.datos);
});

// Delete user by ID
router.delete('/:id', auth.authMiddleware, async (req, res) => {
    const array = await svc.deleteUserById(req.params.id);
    return res.status(array.status).send(array.message);
});

// Get DNI and Password 
router.post('/login', async (req, res) => {
    const array = await svc.getUserByDniPassword(req.body.dni, req.body.contraseña);
    return res.status(array.status).send(array.message);
});

// Register User
router.post('/register', async (req, res) => {
    let ret = await svc.register(new Usuario(1, req.body.dni, req.body.nombre, req.body.apellido, req.body.contraseña, req.body.email));
    if(ret){
        ret = res.status(201).send("Creado");
    }
    else{
        ret = res.status(400).send(respuesta);
    }
    return ret;
});

// Login User
router.get('/login', auth.authMiddleware, async (req, res) => {
    let ret; 
    const array = await svc.login(req.body.dni, req.body.contraseña);
    if(array.success){   
        ret = res.status(201).json(array);
    } else{
        ret = res.status(400).json(array);
    }
    return ret;
});

// Validar Token
router.get('/validartoken', auth.authMiddleware, async (req, res) => {
    return res.status(200).send("Token Valido");
});



export default router;