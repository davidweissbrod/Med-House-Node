import BolsaRepository from '../repositories/bolsa_repository'
const repo = new BolsaRepository();
let obj = {
    message: "",
    success: false,
    datos: null
}

export default class BolsaService{
    async getUserBolsa(idUser){
        let res = await repo.getUserBolsa(idUser)
        if(res.rowCount < 0){
            obj.message = "No se encontro al usuario"
        } else{
            obj.message = "Se encontro la bolsa del usuario"
            obj.success = true
            obj.datos = { rowCount } 
        }
        return obj;
    }
}