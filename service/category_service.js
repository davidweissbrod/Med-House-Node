import CategoryRepository from '../repositories/category_repository.js';
const repo = new CategoryRepository();

let obj = {
    success: false,
    message: "",
    datos: null
};

export default class CategoryService {

    async getAllCategories() {
        try {
            const res = await repo.getAllCategories();
            if (res && res.length > 0) {
                obj.success = true;
                obj.message = 'Se encontraron las categorías';
                obj.datos = res;  // Devuelve directamente las categorías
            } else {
                obj.success = false;
                obj.message = 'No se pudieron obtener las categorías';
                obj.datos = null;
            }
        } catch (error) {
            obj.success = false;
            obj.message = 'Error al obtener las categorías';
            obj.datos = null;
            console.error('Error getting categories:', error);
        }
        return obj;
    }

    async getCategoryById(id) {
        try {
            const res = await repo.getCategoryById(id);
            if (res) {
                obj.success = true;
                obj.message = 'Se encontró la categoría';
                obj.datos = res;  // Devuelve la categoría encontrada
            } else {
                obj.success = false;
                obj.message = 'No se encontró la categoría con el ID proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.success = false;
            obj.message = 'Error al obtener la categoría';
            obj.datos = null;
            console.error('Error getting category by ID:', error);
        }
        return obj;
    }
}