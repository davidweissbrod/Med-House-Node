import BusquedaRepository from '../repositories/busqueda_repository.js';
import MedsRepository from '../repositories/meds_repository.js';
const repo = new BusquedaRepository();
const medrepo = new MedsRepository();
let obj = {
    message: "",
    success: false,
    datos: null
};

export default class BusquedaService {

    async getMeds(query) {
        let res = await medrepo.getMeds(query);
        if (res && res.length > 0) {
            obj.message = "Se encontraron búsquedas para el usuario";
            obj.success = true;
            obj.datos = res;
        } else {
            obj.message = "No se encontraron búsquedas para el usuario";
            obj.success = true;
            obj.datos = null;
        }
        return obj;
    }

    // Obtener todas las búsquedas de un usuario
    async getAllSearch(userId) {
        let res = await repo.getAllSearchByUser(userId);
        if (res && res.length > 0) {
            obj.message = "Se encontraron las búsquedas del usuario";
            obj.success = true;
            obj.datos = res;
        } else {
            obj.message = "No se encontraron las búsquedas del usuario";
            obj.success = true;
            obj.datos = null;
        }
        return obj;
    }

    // Guardar una nueva búsqueda
    async saveSearch(userId, query) {
        let res = await repo.saveSearch(userId, query);
        if (res) {
            obj.success = true;
            obj.message = 'Búsqueda guardada correctamente';
            obj.datos = res;
        } else {
            obj.success = false;
            obj.message = 'No se pudo guardar la búsqueda';
            obj.datos = null;
        }
        return obj;
    }

    // Eliminar una búsqueda por ID
    async deleteSearchById(userId, searchId) {
        const rowCount = await repo.deleteSearchById(userId, searchId);
        if (rowCount > 0) {
            obj.success = true;
            obj.message = 'Búsqueda eliminada correctamente';
            obj.datos = { rowCount };
        } else {
            obj.success = false;
            obj.message = 'No se encontró la búsqueda para eliminar';
            obj.datos = null;
        }
        return obj;
    }

    // Eliminar todas las búsquedas de un usuario
    async deleteAllSearch(userId) {
        const rowCount = await repo.deleteAllSearch(userId);
        if (rowCount > 0) {
            obj.success = true;
            obj.message = 'Todas las búsquedas fueron eliminadas correctamente';
            obj.datos = { rowCount };
        } else {
            obj.success = false;
            obj.message = 'No se encontraron búsquedas para eliminar';
            obj.datos = null;
        }
        return obj;
    }
}