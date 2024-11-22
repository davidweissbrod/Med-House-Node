import MedicamentoRepository from "../repositories/meds_repository.js";
import CategoryService from '../service/category_service.js';

const repo = new MedicamentoRepository();

let obj = {
    success: false,
    message: "",
    datos: null
};

export default class MedicamentoService {

    async getMeds() {
        try {
            const res = await repo.getMeds(id);
            if (res != null) {
                obj.success = true;
                obj.message = 'Se encontraron los medicamentos';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontraron los medicamentos';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener los medicamentos';
        }
        return obj;
    }

    async getMedicamentoById(id) {
        try {
            const res = await repo.getMedicamentoById(id);
            if (res != null) {
                obj.success = true;
                obj.message = 'Se encontró el medicamento';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontró el medicamento con el id proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener el medicamento';
        }
        return obj;
    }

    async getMedicamentoByCategory(idCat, limit = null, offset = null) {
        const CatSvc = new CategoryService();
        try {
            const validatedCategory = await CatSvc.getCategoryById(idCat);
            if (validatedCategory) {
                const res = await repo.getMedicamentoByCategory(idCat, limit, offset); // Pasar limit y offset
                if (res && res.length > 0) {
                    obj.success = true;
                    obj.message = 'Se encontraron los medicamentos por categoría';
                    obj.datos = res;
                } else {
                    obj.success = false;
                    obj.message = 'No se encontraron medicamentos para la categoría proporcionada';
                    obj.datos = null;
                }
            } else {
                obj.message = 'La categoría no existe';
            }
        } catch (error) {
            obj.message = 'Error al obtener los medicamentos por categoría';
        }
        return obj;
    }    

    async deleteMedicamentoById(id) {
        try {
            const rowCount = await repo.deleteMedicamentoById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = 'Se eliminó el medicamento';
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = 'No se encontró el medicamento para eliminar';
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = 'No se pudo eliminar el medicamento, posible integridad referencial';
            } else {
                obj.message = 'Error al eliminar el medicamento';
            }
        }
        return obj;
    }

    async getMedicamentosByDroga(droga) {
        try {
            const res = await repo.getMedicamentosByDroga(droga);
            if (res && res.length > 0) {
                obj.success = true;
                obj.message = 'Se encontraron los medicamentos por droga';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontraron medicamentos con el tipo de droga proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener los medicamentos por droga';
        }
        return obj;
    }

    async putMedicamentoImage(url, id) {
        try {
            const res = await repo.putMedicamentoImage(url, id);
            if (res) {
                obj.success = true;
                obj.message = 'Se cambio la foto del medicamento';
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = 'No se pudo cambiar la foto del medicamento';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener los medicamentos por droga';
        }
        return obj;
    }

    async getMedByName(med){
        try {
            const res = await repo.getMedByName(med);
            if (res && res.length > 0) {
                obj.success = true;
                obj.message = 'Se encontraron los medicamentos';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontraron medicamentos con el nombre proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener los medicamentos';
        }
        return obj;
    }
}