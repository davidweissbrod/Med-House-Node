import UserService from '../service/user_service'
import express from "express"
import AuthMiddleware from '../middlewares/auth_middleware';
const auth = new AuthMiddleware();
const router = express.Router();
const svc = new UserService();

//Faltan endpoints de auth con jwt


// Get user by ID
router.get('/:id', async (req, res) => {
    const array =  await getUserById(req.params.id)
    return res.status(array.status).json(array.datos)
});

// Update user by ID
router.put('/:id', auth.AuthMiddleware, async (req, res) => {
    const array = await updateUser(req.params.id)
    return res.status(array.status).send(array.message)
});

// Insert User
router.post('', async (req, res) => {
    const array = await insertUser(req.body.user)
    return res.status(array.status).json(array.datos)
})

// Delete user by ID
router.delete('/:id', auth.AuthMiddleware, async (req, res) => {
    const array = await deleteUserById(req.params.id)
    return res.status(array.status).send(array.message)
});

// Register User
router.post('/api/user/register', auth.AuthMiddleware, async (req, res) => {
    let ret = await svc.register(new Users (1, req.body.dni, req.body.nombre, req.body.apellido, req.body.contraseña, req.body.email));
    if(ret){
        ret = res.status(201).send("Creado");
    }
    else{
        ret = res.status(400).send(respuesta);
    }   
    return ret;
})

// Login User
router.post('/api/user/login', auth.AuthMiddleware, async (req, res) => {
    let ret; 
    const array = await svc.login(req.body.dni, req.body.contraseña)
    if(array.success){   
        ret = res.status(201).json(array)
    } else{
        ret = res.status(400).json(array)
    }
    return ret;
})

export default router;