import CategoryRepository from '../repositories/category_repository.js';
const repo = new CategoryRepository();
let obj = {
    success: false,
    message: "",
    datos: null
}
export default class CategoryService{

    async getAllCategories(){
        let res = await repo.getAllCategories()
        if(res.rowCount < 0){
            obj.message = 'No se pudieron obtener las categorias'
        } else{
            obj.message = 'Se encontraron las categorias'
            obj.success = true
            obj.datos = { rowCount }
        }
    }

    async getCategoryById(id){
        let res = await repo.getCategoryById(id)
        if(res.rowCount < 0){
            obj.message = 'No se encontro la categoria'
        } else{
            obj.message = 'Se encontro la categoria'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }
}