import UsuarioRepo from "../repositories/user_repository";
const repo = new UsuarioRepo();

export default class UsuarioService{
    async getUserById(id){
        try{
            return await repo.getUserById(id)
        } catch(e){
            return new Error('No se encontro el id: ' + e.message)
        }
    }

    async updateUser(us){
        try{
            return await repo.updateUser(us)
        } catch(e){
            return new Error('No se pudo actualizar el usuario: ' + e.message)
        }
    }

    async insertUser(us){
        try{
            return await repo.insertUser(us)
        } catch(e){
            return new Error('No se pudo agregar el usuario: ' + e.message)
        }
    }

    async deleteUserById(id){
        try{
            return await repo.deleteUserById(id)
        } catch(e){
            return new Error('No se pudo eliminar el usuario: ' + e.message)
        }
    }
}