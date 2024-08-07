import FarmRepository from '../repositories/farm_repository.js';
import Helper from '../helpers/sql-helper.js'
import validacion from "../helpers/validaciones.js";
import jwt from '../middlewares/auth_middleware.js'
const repo = new FarmRepository();
const SQLHelper = new Helper();
const val = new validacion();
let obj = {
    success: false,
    message: "",
    datos: null
}
export default class FarmaceuticoService{
    async getFarmaceuticoById(id){
        const sql = 'SELECT idFarmaceutico FROM Usuario WHERE idFarmaceutico = $1' 
        const values = [id];
        let rowCount =  await SQLHelper.SQLQuery(sql, values);
        rowCount = res.rows[0].count;
        let res = await repo.getFarmaceuticoById(id)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el id del farmaceutico'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el farmaceutico'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }

    async updateFarmaceutico(farmaceutico){
            try {
                const rowCount = await repo.updateFarmaceutico(farmaceutico);
                if (rowCount > 0) {
                    obj.success = true;
                    obj.message = "Se actualizo el farmaceutico";
                    obj.datos = { rowCount };
                } else {
                    obj.success = false;
                    obj.message = "No se encontró el farmaceutico para eliminar";
                    obj.datos = null;
                }
            } catch (error) {
                if (error.code === '23503') {
                    obj.success = false;
                    obj.message = "No se pudo actualizar el farmaceutico";
                    obj.datos = null;
                } else {
                    obj.success = false;
                    obj.message = "Error al actualizar el farmaceutico";
                    obj.datos = null;
                }
            }
            return obj
    }
    deleteFarmaceuticoById = async (id) => {
        try {
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

    login = async (dni, contraseña) => {
        let respuesta = {
            success: false,
            message: "Error de login",
            token: ""
        };
        if (val.getValidatedDni(dni)) {
            const farm = await repo.getFarmByDniPassword(dni, contraseña);
            if (farm != null) {
                const payload = {
                    dni: farm.dni,
                    contraseña: farm.password
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
    }

    register = async (farm) => {
        let ret;
        if (val.getValidatedDni(farm.dni)){       
            ret = "El DNI es invalido";
        }
        else if (val.emailValidation(farm.email)){
            ret = "El Email no es valido";
        }
        else{
            ret = repo.insertFarmaceutico(farm);
        }
        return ret;
    }

    getFarmByDniPassword = async(dni, password) => {
        let res = await repo.getFarmByDniPassword(dni, password)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el farmaceutico'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el farmaceutico'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj;
    }
}