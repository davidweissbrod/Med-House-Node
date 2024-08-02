import UserRepository from "../repositories/user_repository.js";
import SQLHelper from '../helpers/sql-helper.js';
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
    getUserById = async(id) => {
        const sql = 'SELECT idUsuario FROM Usuario WHERE idUsuario = $1' 
        const values = [id];
        let rowCount =  await SQLHelper.SQLQuery(sql, values);
        rowCount = res.rows[0].count;
        let res = await repo.getUserById(id)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el id del usuario'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el usuario'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }

    login = async (dni, password) => {
        let respuesta = {
            success: false,
            message: "Error de login",
            token: ""
        };
        const repo = new UserRepository();
        if (val.getValidatedDni(dni)) {
            const usuario = await repo.getUserByDniPassword(dni, password);
            if (usuario != null) {
                const payload = {
                    dni: usuario.dni,
                    contraseña: usuario.password
                };
                console.log('payload', payload)
                const options = {
                    expiresIn: '1h',
                };
                const token = jwt.sign(payload, 'MedHouse', options);
                respuesta.success = true;
                respuesta.message = "Login exitoso";
                respuesta.token = token;
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
        const repo = new UserRepository();
        let ret;
        if (val.getValidatedDni(user.dni)){       
            ret = "El DNI es invalido";
        }
        else if (val.emailValidation(user.email)){
            ret = "El Email no es valido";
        }
        else{
            ret = repo.insertUser(user);
        }
        return ret;
    }

    updateUser = async (us) => {
        const validatedUser = this.updateUser(us)
            try {
                const rowCount = await repo.updateUser(us);
                if (rowCount > 0) {
                    obj.success = true;
                    obj.message = "Se actualizo el usuario";
                    obj.datos = { rowCount };
                } else {
                    obj.success = false;
                    obj.message = "No se encontró el usuario para actualizar";
                    obj.datos = null;
                }
            } catch (error) {
                if (error.code === '23503') {
                    obj.success = false;
                    obj.message = "No se pudo actualizar el usuario";
                    obj.datos = null;
                } else {
                    obj.success = false;
                    obj.message = "Error al actualizar el usuario";
                    obj.datos = null;
                }
            }
            return obj
    }

    deleteUserById = async (id) => {
        try {
            const rowCount = await repo.deleteUserById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se elimino el usuario";
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = "No se encontró el usuario para eliminar";
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.success = false;
                obj.message = "No se pudo eliminar el usuario";
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = "Error al eliminar el usuario";
                obj.datos = null;
            }
        }
        return obj;
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

