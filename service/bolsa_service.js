import BolsaRepository from '../repositories/bolsa_repository.js'
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

    async updateBolsa(med){
        const rowCount  = await repo.updateBolsa(med)
        if(rowCount > 0){
            obj.success = true
            obj.message = 'Se añadio el medicamento a la bolsa'
            obj.datos = { rowCount }
        } else{
            obj.message = 'No se pudo añadir el medicamento a la bolsa'
        }
        return obj
    }

    async deleteMedBolsa(idMed){
        try {
            const rowCount = await repo.deleteMedBolsa(idMed);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se eliminó el item";
                obj.datos = { rowCount };
            } else {
                obj.message = "No se encontró el item para eliminar";
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = "No se pudo eliminar el item";
            } else {
                obj.message = "Error al eliminar el item";
            }
        }
        return obj
    }
}