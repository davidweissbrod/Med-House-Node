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

// Login User
router.post('/login', async (req, res) => {
    const response = await svc.login(req.body.dni, req.body.contraseña);
    if(response != null){
        if(response.success){   
            return res.status(201).json(response);
        } 
        else {
            return res.status(400).json(response);
        }
    }
    else{
        return response.status(401).json(response);
    }
});

// Register User
router.post('/register', async (req, res) => {
    let response = await svc.register(req.body);
    if(response != null){
        if(response.success){   
            return res.status(201).json(response);
        } 
        else {
            return res.status(400).json(response);
        }
    }
    else{
        return response.status(401).json(response);
    }
});

// Validar Token
router.get('/validartoken', auth.authMiddleware, async (req, res) => {
    return res.status(200).send("Token Valido");
});



export default router;