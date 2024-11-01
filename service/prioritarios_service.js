import PrioritariosRepository from "../repositories/prioritarios_repository.js";


const repo = new PrioritariosRepository();

let obj = {
    success: false,
    message: "",
    datos: null
};

export default class PrioritariosService {

    async getPrioritariosById(id) {
        try {
            const res = await repo.getPrioritariosById(id);
            if (res != null) {
                obj.success = true;
                obj.message = 'Se encontró el prioritario';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontró el prioritario con el id proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener el prioritario';
        }
        return obj;
    }

    async postNewPrioritario(prioritario){
        try {
            const res = await repo.postNewPrioritario(prioritario);
            if (res) {
                obj.success = true;
                obj.message = 'Se creó el prioritario correctamente';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se pudo crear el prioritario';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al crear el prioritario';
        }
        return obj;
    }

    async deletePrioritario(id){
        try {
            const rowCount = await repo.deletePrioritario(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = 'Se eliminó el prioritario';
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = 'No se encontró el prioritario para eliminar';
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = 'No se pudo eliminar el prioritario, posible integridad referencial';
            } else {
                obj.message = 'Error al eliminar el prioritario';
            }
        }
        return obj;
    }
}
