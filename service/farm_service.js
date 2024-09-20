import FarmRepository from '../repositories/farm_repository.js';
import validacion from "../helpers/validaciones.js";
import jwt from 'jsonwebtoken'
const repo = new FarmRepository();
const val = new validacion();
let obj = {
    success: false,
    message: "",
    datos: null
}
export default class FarmaceuticoService{
    async getFarmaceuticoById(id){
        const rowCount = await repo.getFarmaceuticoById(id)
        if(rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el id'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el farmaceutico'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }

    updateFarmaceutico = async (info, user) => {
        try {
            if (info.dni != user.dni) {
                obj.message = "No tienes permiso para actualizar este farmaceutico";
                return respuesta;
            }
    
            const rowCount = await repo.updateFarmaceutico(info);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se actualizó el farmaceutico";
                obj.datos = { rowCount };
            } else {
                obj.message = "No se encontró el farmaceutico para actualizar";
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = "No se pudo actualizar el farmaceutico";
            } else {
                obj.message = "Error al actualizar el farmceutico";
            }
        }
        return obj;
    }
    deleteFarmaceuticoById = async (id, tokenUserId) => {
        try {
            console.log('ID del usuario a eliminar:', id);
            console.log('ID del usuario autenticado:', tokenUserId);

            if (id != tokenUserId) {
                obj.message = "No tienes permiso para eliminar este usuario";
                obj.success = false
                obj.datos = null
                return obj;
            }

            const rowCount = await repo.deleteFarmaceuticoById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se elimino el farmaceutico";
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = "No se encontró el farmaceutico para eliminar";
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.success = false;
                obj.message = "No se pudo eliminar el farmaceutico";
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = "Error al eliminar el farmcaeutico";
                obj.datos = null;
            }
        }
        return obj;
    };

    login = async (dni, password) => {
        let respuesta = {
            success: false,
            message: "Error de login",
            token: "",
            user: ""
        };
        const repo = new FarmRepository();
        if (val.getValidatedDni(dni)) {
            const farm = await repo.getFarmByDniPassword(dni, password);
            if (farm != null) {
                const payload = {
                    dni: farm.dni,
                    password: farm.password,
                    id: farm.id
                };
                const options = {
                    expiresIn: '5h',
                };
                const token = jwt.sign(payload, 'MedHouse', options);
                respuesta.success = true;
                respuesta.message = "Login exitoso";
                respuesta.token = token;
                respuesta.user = farm;
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

        const repo = new FarmRepository();

        if (!val.getValidatedDni(user.dni)){       
            respuesta.message = "El DNI es invalido";
        }
        else if (!val.emailValidation(user.email)){
            respuesta.message = "El Email no es valido";
        }
        else{
            const success = await repo.insertFarmaceutico(user);
            if(success){
                respuesta.success = true;
                respuesta.message = "Usuario creado exitosamente";
            } else{
                respuesta.message = "Error al crear el usuario";
            }
        }
        return respuesta;
    }

}