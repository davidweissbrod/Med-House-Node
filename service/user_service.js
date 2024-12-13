import UserRepository from "../repositories/user_repository.js";
import ValidacionesHelper from '../helpers/validaciones.js';
import jwt from 'jsonwebtoken';
const repo = new UserRepository();
const val = new ValidacionesHelper();
let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
}

export default class UsuarioService{
    getNameAndSurname = async(id) => {
        let res = await repo.getNameAndSurname(id)
        console.log(res)
        if(res === null){
            obj.status = 404
            obj.message = 'No se encontro el id del usuario'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el usuario'
            obj.success = true
            obj.datos = res
        }
        return obj
    }

    login = async (dni, password) => {
        let respuesta = {
            success: false,
            message: "Error de login",
            token: "",
            user: ""
        };
        const repo = new UserRepository();
        if (val.getValidatedDni(dni)) {
            const usuario = await repo.getUserByDniPassword(dni, password);
            if (usuario != null) {
                const payload = { 
                    id: usuario.id,
                    dni: usuario.dni,
                    contraseña: usuario.password
                };
                const options = {
                    expiresIn: '5h',
                };
                const token = jwt.sign(payload, 'MedHouse', options);
                respuesta.success = true;
                respuesta.message = "Login exitoso";
                respuesta.token = token;
                respuesta.user = usuario;
                return respuesta;
            }
            else{
                respuesta.success = false;
                respuesta.message = "El usuario no existe";
                respuesta.token = "";
                return respuesta;
            }
        } else {
            respuesta.success = false;
            respuesta.message = "Formato de DNI invalido";
            respuesta.token = "";
            return respuesta;
        }
    };

    register = async (user) => {
        let respuesta = {
            success: false,
            message: ""
        };

        const repo = new UserRepository();

        if (!val.getValidatedDni(user.dni)){       
            respuesta.message = "El DNI es invalido";
        }
        else if (!val.emailValidation(user.email)){
            respuesta.message = "El Email no es valido";
        }
        else{
            const success = await repo.insertUser(user);
            if(success){
                respuesta.success = true;
                respuesta.message = "Usuario creado exitosamente";
            } else{
                respuesta.message = "Error al crear el usuario";
            }
        }
        return respuesta;
    }

    updateUser = async (userInfo, user) => {
        let respuesta = {
            success: false,
            message: "Error al actualizar el usuario",
            datos: null
        };
        try {
    
            // Llamar al repositorio para actualizar el usuario
            const rowCount = await repo.updateUser(userInfo, user);
            if (rowCount > 0) {
                respuesta.success = true;
                respuesta.message = "Se actualizó el usuario";
                respuesta.datos = { rowCount };
            } else {
                respuesta.message = "No se encontró el usuario para actualizar";
            }
        } catch (error) {
            if (error.code === '23503') {
                respuesta.message = "No se pudo actualizar el usuario";
            } else {
                respuesta.message = "Error al actualizar el usuario";
            }
        }
    
        return respuesta;
    }

    deleteUserById = async (id, tokenUserId) => {
        let respuesta = {
            success: false,
            message: "Error al eliminar el usuario",
            datos: null
        };
    
        try {
            console.log('ID del usuario a eliminar:', id);
            console.log('ID del usuario autenticado:', tokenUserId);
            if (id != tokenUserId) {
                respuesta.message = "No tienes permiso para eliminar este usuario";
                respuesta.success = false
                respuesta.datos = null
                return respuesta;
            }
    
            const rowCount = await repo.deleteUserById(id);
            if (rowCount > 0) {
                respuesta.success = true;
                respuesta.message = "Se eliminó el usuario";
                respuesta.datos = { rowCount };
            } else {
                respuesta.message = "No se encontró el usuario para eliminar";
                respuesta.success = false
                respuesta.datos = null
            }
        } catch (error) {
            if (error.code === '23503') {
                respuesta.message = "No se pudo eliminar el usuario";
                respuesta.success = false
                respuesta.datos = null
            } else {
                respuesta.message = "Error al eliminar el usuario";
                respuesta.success = false
                respuesta.datos = null
            }
        }
    
        return respuesta;
    };    

    getUserByDniPassword = async(dni, password) => {
        let res = await repo.getUserByDniPassword(dni, password)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el usuario'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el usuario'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj;
    }
}

