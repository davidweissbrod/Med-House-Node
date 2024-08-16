import UserService from '../service/user_service.js';
import express from "express";
import AuthMiddleware from '../middlewares/auth_middleware.js';
const auth = new AuthMiddleware();
const router = express.Router();
const svc = new UserService();

// Login User
router.post('/login', async (req, res) => {
    let response = await svc.login(req.body.dni, req.body.password);

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

// Update user
router.put('/', auth.authMiddleware, async (req, res) => { 
    let response = await svc.updateUser(req.body, req.user);
    
    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } else {
        return res.status(401).json(response);
    }
});

// Delete user by ID
router.delete('/:id', auth.authMiddleware, async (req, res) => {
    let response = await svc.deleteUserById(req.params.id);

    if (response != null) {
        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } else {
        return res.status(401).json(response);
    }
});

export default router;