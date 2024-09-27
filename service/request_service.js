import RequestRepository from '../repositories/request_repository.js';
import ValidacionesHelper from '../helpers/validaciones.js';
import MedsRepository from '../repositories/meds_repository.js';

const repo = new RequestRepository();
const val = new ValidacionesHelper();
const medrepo = new MedsRepository();

let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
};

export default class RequestService {
    // Obtener todas las solicitudes para un usuario
    getAllRequests = async (userId) => {
        let res = await repo.getAllRequestsByUserId(userId);

        if (res.rowCount !== 0) {
            obj.status = 200;
            obj.message = 'Se encontraron las solicitudes';
            obj.success = true;
            obj.datos = res;
        } else {
            obj.status = 404;
            obj.message = 'No se encontraron solicitudes';
            obj.datos = null;
        }
        return obj;
    };

    // Obtener una solicitud específica
    getRequestById = async (userId, requestId) => {
        let res = await repo.getRequestById(userId, requestId);

        if (res) {
            obj.status = 200;
            obj.message = 'Solicitud encontrada';
            obj.success = true;
            obj.datos = res;
        } else {
            obj.status = 404;
            obj.message = 'Solicitud no encontrada';
            obj.success = false;
            obj.datos = null;
        }
        return obj;
    };

    // Crear una nueva solicitud
    addRequest = async (userId, requestData) => {
        let respuesta = { success: false, message: "" };

        // Verificar si el medicamento existe
        let medicamentoExists = await medrepo.existsMedicamentoById(requestData.medId);
        if (!medicamentoExists) {
            respuesta.message = "ID de medicamento inválido";
        } else {
            // Crear la solicitud
            const success = await repo.addRequest(userId, requestData);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Solicitud creada exitosamente";
            } else {
                respuesta.message = "Error al crear la solicitud";
            }
        }
        return respuesta;
    };

    // Revisar (actualizar) una solicitud
    updateRequest = async (userId, requestData) => {
        let respuesta = { success: false, message: "" };

        let requestExists = await repo.getRequestById(userId, requestData.id);
        if (!requestExists) {
            respuesta.message = "Solicitud no encontrada";
        } else {
            const success = await repo.updateRequest(userId, requestData);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Solicitud actualizada exitosamente";
            } else {
                respuesta.message = "Error al actualizar la solicitud";
            }
        }
        return respuesta;
    };

    // Eliminar una solicitud
    removeRequest = async (userId, idRequest) => {
        let respuesta = { success: false, message: "" };

        let requestExists = await repo.getRequestById(userId, idRequest);
        if (!requestExists) {
            respuesta.message = "Solicitud no encontrada";
        } else {
            const success = await repo.removeRequest(userId, idRequest);
            if (success) {
                respuesta.success = true;
                respuesta.message = "Solicitud eliminada exitosamente";
            } else {
                respuesta.message = "Error al eliminar la solicitud";
            }
        }
        return respuesta;
    };
}