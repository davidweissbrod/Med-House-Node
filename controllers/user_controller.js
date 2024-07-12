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
    let ret;
    const array =  await updateUser(req.params.id)
    ret = res.status(array.status).send(array.message)
    
})

// Insert User
router.post('', async (req, res) => {  //revisar
    let ret;
    const array =  await getUserById(req.body.user)
    ret = res.status(array.status).send(array.message)
})

// Delete user by ID
router.delete('/:id', async (req, res) => {
    let ret;
    const array =  await deleteUserById(req.params.id)
    ret = res.status(array.status).send(array.message)
});

export default router;


router.get('', async(req,res) => {
    let ret;
    const array =  await getUserByDniPassword(req.body.dni, req.body.contraseña)
    ret = res.status(array.status).send(array.message)
});