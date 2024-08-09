import MedicamentoRepository from "../repositories/meds_repository.js";
import CategoryService from '../service/category_service.js'
import SQL_Helper from '../helpers/sql-helper.js'
const repo = new MedicamentoRepository();
const helper = new SQL_Helper();

let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
}
export default class MedicamentoService{
    async getAllAsync(){
        return await repo.getAllAsync();
    }
    async getMedicamentoById(id){
        let res = await repo.getMedicamentoById(id)
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

    async getMedicamentoByCategory(idCat){
        const CatSvc = new CategoryService()
        const validatedCategory = await CatSvc.getCategoryById(idCat)
        if(validatedCategory != null){
            const res = await repo.getMedicamentoByCategory(idCat)
            obj.message = 'Se encontro el medicamento con exito'
            obj.status = 200
            obj.datos = { res }
            obj.success = true
        } else{
            obj.message = 'La categoria no existe'
            obj.status = 400   
        }
        return obj
    }

    /*async insertMedicamento(med){
        //Fijarnos las validaciones despues
        try{
            const rowCount = await repo.insertMedicamento(med);
            if(rowCount > 0){
                obj.success = true;
                obj.status = 201;
                obj.message = "Se ingreso el medicamento";
                obj.datos = { rowCount };
            } else{
                obj.success = false;
                obj.status = 400;
                obj.message = "No se pudo crear";
                obj.datos = null;
            }
        }catch(error){
            if (error.code === '23503') {
                obj.success = false;
                obj.message = "No se pudo ingresar el medicamento";
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = "Error al ingresar el medicamento";
                obj.datos = null;
            }
        }
        
    }

    async updateMedicamento(medicamento){
        const validatedMed = this.getMedicamentoById(medicamento.id)
        if(validatedMed != null){
           const res = await repo.updateMedicamento(medicamento)
           obj.status = 201
           obj.message = 'Se actualizo el medicamento'
           obj.datos = { res }
           obj.success = true
        } else{
           obj.status = 404
           obj.message = 'No se encontro el medicamento para actualizar'
        }
    }*/

    async deleteMedicamentoById(id) {
        try {
            const rowCount = await repo.deleteMedicamentoById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se elimino el Medicamento";
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = "No se encontró el medicamento para eliminar";
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.success = false;
                obj.message = "No se pudo eliminar el medicamento";
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = "Error al eliminar el medicamento";
                obj.datos = null;
            }
        }
        return obj;
    }
}