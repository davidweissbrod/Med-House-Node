import MedicamentoRepository from "../repositories/meds_repository";
import CategoryService from '../service/category_service'
import SQL_Helper from '../helpers/sql-helper'
const repo = new MedicamentoRepository();
const helper = new SQL_Helper();

let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
}
export default class MedicamentoService{
    async getMedicamentoById(id){
        const sql = 'SELECT idMedicamento FROM Medicamento WHERE idMedicamento = $1' 
        const values = [id];
        let rowCount =  await helper.SQLQuery(sql, values);
        rowCount = res.rows[0].count;
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
            const res = await getMedicamentoByCategory(idCat)
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

    async insertMedicamento(medicamento){
        const validatedMed = this.getMedicamentoById(medicamento.id)
        if(validatedMed != null){
            if (val.getValidatedDni(user.dni)){       
                ret = "El DNI es invalido";
            }
            else if (val.emailValidation(user.email)){
                ret = "El Email no es valido";
            }
            else{
                ret = repo.insertUser(user);
            }
        }
        
    }

    async updateMedicamento(medicamento){
        
    }

    async deleteMedicamentoById(id) {
       
    }
}