import MedicamentoRepository from "../repositories/meds_repository.js";
import CategoryService from '../service/category_service.js'
const repo = new MedicamentoRepository();

let obj = {
    success: false,
    message: "",
    datos: null
}
export default class MedicamentoService{
    async getAllMedicamentos(){
        return await repo.getAllMedicamentos();
    }

    async getMedicamentoById(id){
        let res = await repo.getMedicamentoById(id)
        if(res.rowCount < 0){
            obj.message = 'No se encontro el id del medicamento'
            obj.datos = null
        } else{
            obj.message = 'Se encontro el medicamento'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }

    async getMedicamentoByCategory(idCat){
        const CatSvc = new CategoryService()
        const validatedCategory = await CatSvc.getCategoryById(idCat)
        if(validatedCategory != null){
            let res = await repo.getMedicamentoByCategory(idCat)
            if(res != null){
                obj.message = 'Se encontro el medicamento con exito'
                obj.datos = { res }
                obj.success = true
            } else{
                obj.message = 'No se encontro la categoria'
                obj.datos = { res }
            }
        } else{
            obj.message = 'La categoria no existe' 
        }
        return obj
    }

    async deleteMedicamentoById(id) {
        try {
            const rowCount = await repo.deleteMedicamentoById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se elimino el Medicamento";
                obj.datos = { rowCount };
            } else {
                obj.message = "No se encontró el medicamento para eliminar";
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = "No se pudo eliminar el medicamento";
            } else {
                obj.message = "Error al eliminar el medicamento";
            }
        }
        return obj;
    }

    async getMedicamentosByDroga(droga){
        let res = await repo.getMedicamentosByDroga(droga)
        if(res.rowCount > 0){
            obj.success = true;
            obj.message = 'Se encontraron los medicamentos'
            obj.datos = { rowCount }
        } else{
            obj.message = 'No se encontaron medicamentos con ese tipo de droga'
        }
        return obj
    }
}

