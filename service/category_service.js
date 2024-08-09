import Helper from '../helpers/sql-helper.js'
import CategoryRepository from '../repositories/category_repository.js';
const sqlHelper = new Helper();
const repo = new CategoryRepository();
let obj = {
    success: false,
    message: "",
    token: ""
}
export default class CategoryService{
    async getCategoryById(id){
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