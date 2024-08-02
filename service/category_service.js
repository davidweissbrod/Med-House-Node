import Helper from '../helpers/sql-helper'
import CategoryRepository from '../repositories/category_repository';
const sqlHelper = new Helper();
const repo = new CategoryRepository();
let obj = {
    success: false,
    message: "",
    token: ""
}
export default class CategoryService{
    async getCategoryById(id){
        const sql = 'SELECT idCategoria FROM Categoria WHERE idCategoria = $1' 
        const values = [id];
        let rowCount =  await sqlHelper.SQLQuery(sql, values);
        rowCount = res.rows[0].count;
        let res = await repo.getFarmaceuticoById(id)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro la categoria'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro la categoria'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }
}