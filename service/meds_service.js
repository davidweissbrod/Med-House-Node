import MedicamentoRepository from "../repositories/meds_repository";
const repo = new MedicamentoRepository();

export default class MedicamentoService{
    async getAllAsync() {
        try{
            return await repo.getAllAsync()
        } catch(e){
            return new Error('No se pudieron obtener los medicamentos: ' + e.message);
        }
    }

    async getMedicamentoById(id){
        try{
            return await repo.getMedicamentoById(id)
        } catch(e){
            return new Error('No se encontro el id: ' + e.message);
        }
    }

    async getMedicamentoByCategory(idCat){
        try{    
            return await repo.getMedicamentoByCategory(idCat)
        } catch(e){
            return new Error('No se encontro un medicamento con esa categoria: ' + e.message)
        }
    }

    async insertMedicamento(medicamento){
        try{
            return await repo.insertMedicamento(medicamento)
        } catch(e){
            return new Error('No se pudo insertar el medicamento: ' + e.message)
        }
    }

    async updateMedicamento(medicamento){
        try{
            return await repo.updateMedicamento(medicamento)
        } catch(e){
            return new Error('No se pudo actualizar el medicamento: ' + e.message)
        }
    }

    async deleteMedicamentoById(id) {
        try {
            return await repo.deleteMedicamentoById(id);
        } catch (e) {
            throw new Error('Error eliminando el medicamento: ' + e.message);
        }
    }
}