import UserService from '../service/user_service'
import express from "express"
const router = express.Router();
const svc = new UserService();

//Faltan endpoints de auth con jwt


// Get user by ID
router.get('/:id', async (req, res) => {
    let ret;
    const array =  await getUserById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const usuario = await user.updateUserById(new Usuario(req.body.dni, req.body.nombre, req.body.apellido, req.body.contraseña, req.body.mail, req.body.fotoPerfil, req.body.fechaNacimiento, req.body.genero, req.body.telefono));
        if (!usuario) return res.status(404).send();
        res.send(usuario);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Insert User
router.post('', async (req, res) => {
    try {
        const usuario = await user.insertUser(new Usuario(req.body.dni, req.body.nombre, req.body.apellido, req.body.contraseña, req.body.mail, req.body.fotoPerfil, req.body.fechaNacimiento, req.body.genero, req.body.telefono))
        res.status(201).send(usuario);
    } catch (err) {
        res.status(400).send(err);
    }
})

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await user.deleteUserById(req.params.id);
        if (!usuario) return res.status(404).send();
        res.send(usuario);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;