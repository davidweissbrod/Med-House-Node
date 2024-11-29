import PedidosRepository from '../repositories/pedidos_repository.js';
import BolsaRepository from '../repositories/bolsa_repository.js';
const repo = new PedidosRepository();
const bolsaRepo = new BolsaRepository();

let obj = {
    message: "",
    success: false,
    datos: null,
    info: null
};

export default class PedidosService {

    // Obtener todas las solicitudes (búsquedas) de un usuario
    async getAllRequests(userId) {
        // Aquí puedes modificar la lógica según lo que se desee hacer con el query
        let res = await repo.getAllRequests(userId); // Reemplaza con el método adecuado en el repositorio
        if (res && res.length > 0) {
            obj.message = "Se encontraron las solicitudes";
            obj.success = true;
            obj.datos = res;
            obj.info = null;
        } else {
            obj.message = "No se encontraron solicitudes";
            obj.success = false;
            obj.datos = null;
            obj.info = null;
        }
        return obj;
    }

    // Obtener una solicitud específica de un usuario
    async getRequestById(id) {
        let res = await repo.getRequestById(id); // Aquí obtienes una solicitud para un usuario específico
        let res2 = await repo.getRequestInfo(id); // Trae la info de la request
        if (res) {
            obj.message = "Solicitud encontrada";
            obj.success = true;
            obj.datos = res;
            obj.info = res2;
            
        } else {
            obj.message = "No se encontró la solicitud";
            obj.success = false;
            obj.datos = null;
            obj.info = null;
        }
        return obj;
    }

    // Guardar una nueva solicitud
    async postRequest(userId) {
        // Obtener los productos de la bolsa del usuario
        let bolsa = await bolsaRepo.getUserBolsa(userId);
        if (!bolsa || bolsa.length === 0) {
            obj.success = false;
            obj.message = 'La bolsa está vacía. No se puede procesar el pedido';
            obj.datos = null;
            obj.info = null;
            return obj;
        }

        // Crear un nuevo pedido
        let res = await repo.postRequest(userId); // Aquí se crea el nuevo pedido en la tabla 'pedidos'
        if (res) {
            // Ahora, insertamos los productos en la tabla 'detallepedidos'
            const requestId = res.id;  // Id del pedido creado

            // Iteramos sobre los productos en la bolsa para insertarlos en 'detallepedidos'
            let detallePromises = bolsa.map(async (producto) => {
                // Aquí insertamos cada medicamento relacionado con el pedido
                let medicamentoId = producto.id_medicamento;
                await repo.addMedicamentoToDetalle(requestId, medicamentoId);  // Asegúrate de tener el método adecuado en 'meds_repository.js'
            });

            // Esperamos a que todos los detalles se inserten
            await Promise.all(detallePromises);

            // Si la creación del pedido fue exitosa, eliminamos la bolsa actual
            await bolsaRepo.deleteBolsa(userId);

            obj.success = true;
            obj.message = 'Solicitud guardada correctamente y bolsa vaciada';
            obj.datos = res;
            obj.info = null;
        } else {
            obj.success = false;
            obj.message = 'No se pudo guardar la solicitud';
            obj.datos = null;
            obj.info = null;
        }
        return obj;
    }

    // Eliminar un pedido por ID
    async deleteRequest(userId, requestId) {
        const rowCount = await repo.deleteRequest(userId, requestId); // Elimina la solicitud del repositorio
        if (rowCount > 0) {
            obj.success = true;
            obj.message = 'Solicitud eliminada correctamente';
            obj.datos = { rowCount };
            obj.info = null;
        } else {
            obj.success = false;
            obj.message = 'No se encontró la solicitud para eliminar';
            obj.datos = null;
            obj.info = null;
        }
        return obj;
    }
}