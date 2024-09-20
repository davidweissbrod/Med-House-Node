import BolsaRepository from '../repositories/bolsa_repository.js';
const repo = new BolsaRepository();
let obj = {
    message: "",
    success: false,
    datos: null
};

export default class BolsaService {
    async getUserBolsa(id) {
        let res = await repo.getUserBolsa(id);
        if (res && res.length > 0) {
            obj.message = "Se encontró la bolsa del usuario";
            obj.success = true;
            obj.datos = res;  // Aquí puedes devolver directamente las filas
        } else {
            obj.success = true;
            obj.message = "No se encontró la bolsa del usuario";
            obj.datos = null;
        }
        return obj;
    }

    async checkMedInBolsa(id, medid) {
        const exists = await repo.checkMedInBolsa(id, medid);
        let obj = {
            message: exists ? 'El medicamento ya está en la bolsa.' : 'El medicamento no está en la bolsa.',
            success: true,
            datos: exists
        };
        return obj;
    }      

    async postMedBolsa(id, medid) {
        const rowCount = await repo.postMedBolsa(id, medid);
        if (rowCount > 0) {
            obj.success = true;
            obj.message = 'Se añadió el medicamento a la bolsa';
            obj.datos = { rowCount };
        } else {
            obj.success = false;
            obj.message = 'No se pudo añadir el medicamento a la bolsa';
            obj.datos = null;
        }
        return obj;
    }

    async deleteMedBolsa(id, medid) {
        try {
            const rowCount = await repo.deleteMedBolsa(id, medid);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se eliminó el medicamento de la bolsa";
                obj.datos = { rowCount };
            } else {
                obj.message = "No se encontró el medicamento para eliminar";
            }
        } catch (error) {
            obj.message = "Error al eliminar el medicamento";
        }
        return obj;
    }
}