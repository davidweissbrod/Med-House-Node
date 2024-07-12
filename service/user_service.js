import UsuarioRepo from "../repositories/user_repository";
import SQLHelper from '../helpers/sql-helper'
import ValidacionesHelper from '../helpers/validaciones'
const repo = new UsuarioRepo();
const val = new ValidacionesHelper();
let obj = {
    success: false,
    status: 0,
    message: ""
}

export default class UsuarioService{
    async getUserById(id){
        const sql = 'SELECT idUsuario FROM Usuario WHERE idUsuario = $1' 
        const values = [id];
        let us =  await SQLHelper.SQLQuery(sql, values);
        us = res.rows[0].count;
        let res = await repo.getUserById(id)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el id del usuario'
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el usuario'
            obj.success = true
        }
    }
    async updateUser(us){
        const validatedUser = this.getUserById(us.idUsuario)
        if(validatedUser != null){
            obj.message = "Se actualizo el usuario"
            obj.status = 201
            obj.success = true
        } else{
            obj.message = "No se pudo actualizar el usuario"
            obj.status = 400
        }
    }

    login = async (dni, contraseña) => {
        let objeto = {
            success: false,
            message: "Error de login",
            token: ""
        }     
        const repo = new UsuarioRepo()
        let user = await repo.getUserByDniPassword(dni, contraseña)
        if (user != null){
            if(user.password === password){
                objeto.success = true;
                objeto.message = "Correcto";
                objeto.token = await auth.login(user);
            }
            else{
                objeto.message = "Contraseña incorrecta";
            }
        }
        else{
            objeto.message = "No se encontro el usuario";
        }
        return objeto;
    }

    register = async (user) => {
        const repo = new UsuarioRepo();
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

}