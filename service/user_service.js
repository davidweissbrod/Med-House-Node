import UsuarioRepo from "../repositories/user_repository";
import SQLHelper from '../helpers/sql-helper'
const repo = new UsuarioRepo();

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

    async insertUser(us){
       const repo = new UsuarioRepo();
    }

    async deleteUserById(id){
        try{
            return await repo.deleteUserById(id)
        } catch(e){
            return new Error('No se pudo eliminar el usuario: ' + e.message)
        }
    }
}