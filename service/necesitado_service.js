import NecesitadoRepository from "../repositories/necesitado_repository.js";  // Asegúrate de crear este repositorio
import ValidacionesHelper from '../helpers/validaciones.js';
import MedsRepository from '../repositories/meds_repository.js'

const repo = new NecesitadoRepository();
const val = new ValidacionesHelper();
const medrepo = new MedsRepository();

let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
};

export default class NecesitadoService {
    // Get all Necesitados for a user
    getAllNecesitados = async (userId) => {
        let res = await repo.getAllNecesitadosByUserId(userId);

        if (res.rowCount > 0) {
            obj.status = 200;
            obj.message = 'Se encontraron los medicamentos necesarios';
            obj.success = true;
            obj.datos = res.rows; // Assuming `res.rows` contains the data
        } else {
            obj.status = 404;
            obj.message = 'No se encontraron medicamentos necesarios';
            obj.datos = null;
        }
        return obj;
    };

    // Add a Necesitado
    addNecesitado = async (userId, idMedicamento) => {
        let respuesta = {
            success: false,
            message: ""
        };

        if (!medrepo.existsMedicamentoById(idMedicamento)) {  // Assuming `isValidId` is a method to validate IDs
            respuesta.message = "ID de medicamento inválido";
        } else {
            const success = await repo.addNecesitado(userId, idMedicamento);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Medicamento añadido a la lista de necesitados";
            } else {
                respuesta.message = "Error al añadir medicamento a la lista";
            }
        }
        return respuesta;
    };

    // Remove a Necesitado
    removeNecesitado = async (userId, idMedicamento) => {
        let respuesta = {
            success: false,
            message: ""
        };

        if (!medrepo.existsMedicamentoById(idMedicamento)) {  // Assuming `isValidId` is a method to validate IDs
            respuesta.message = "ID de medicamento inválido";
        } else {
            const success = await repo.removeNecesitado(userId, idMedicamento);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Medicamento eliminado de la lista de necesitados";
            } else {
                respuesta.message = "Error al eliminar medicamento de la lista";
            }
        }
        return respuesta;
    };
}