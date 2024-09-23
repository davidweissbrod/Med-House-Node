import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class RequestRepository {
    // Crear una instancia del cliente para conectarse a la base de datos
    createClient() {
        return new Client(DBConfig);
    }

    // Obtener todas las solicitudes de un usuario
    getAllRequestsByUserId = async (userId) => {
        const query = `SELECT * FROM request WHERE id_usuario = $1 ORDER BY fecha_apertura DESC`;
        const values = [userId];
        const client = this.createClient();

        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(query, values);
            return result.rows;  // Devolver todas las solicitudes
        } catch (error) {
            console.error('Error al obtener las solicitudes: ', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    };

    // Obtener una solicitud específica por ID
    getRequestById = async (userId, requestId) => {
        const query = `SELECT * FROM request WHERE id_usuario = $1 AND id = $2`;
        const values = [userId, requestId];
        const client = this.createClient();

        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(query, values);
            if (result.rowCount === 0) {
                return null;  // No se encontró la solicitud
            }
            return result.rows[0];  // Retornar la solicitud encontrada
        } catch (error) {
            console.error('Error al obtener la solicitud: ', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    };

    // Crear una nueva solicitud
    addRequest = async (userId, requestData) => {
        const query = `
            INSERT INTO request (id_usuario, id_farmaceutico, id_medicamento, estado, descripcion, fecha_caducidad, fecha_apertura, cantidad, comentario)
            VALUES ($1, $2, $3, NULL, $4, $5, COALESCE($6, CURRENT_DATE), $7, $8)
            RETURNING id`;
        
        const values = [
            userId,                                 // Id_usuario
            requestData.id_farmaceutico || null,    // Id_farmaceutico (NULL si no está presente)
            requestData.id_medicamento,             // Id_medicamento (obligatorio)
            requestData.descripcion,                // Descripción (obligatorio)
            requestData.fecha_caducidad,            // Fecha_caducidad (obligatorio)
            requestData.fecha_apertura || null,     // Fecha_apertura (por defecto la fecha actual si es NULL)
            requestData.cantidad || null,           // Cantidad (NULL si no está presente)
            requestData.comentario || null          // Comentario (NULL si no está presente)
        ];
    
        const client = this.createClient();
    
        try {
            await client.connect();
            const result = await client.query(query, values);
            return result.rowCount > 0;  // Retorna true si la inserción es exitosa
        } catch (error) {
            console.error('Error al crear la solicitud: ', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    };    

    // Actualizar una solicitud existente
    updateRequest = async (userId, requestData) => {
        const query = `
            UPDATE request
            SET id_farmaceutico = $2, id_medicamento = $3, estado = $4, descripcion = $5, fecha_caducidad = $6, fecha_apertura = COALESCE($7, fecha_apertura), cantidad = $8, comentario = $9
            WHERE id_usuario = $1 AND id = $10
            RETURNING id`;
    
        const values = [
            userId,                                 // Id_usuario
            requestData.id_farmaceutico || null,    // Id_farmaceutico
            requestData.id_medicamento,             // Id_medicamento (obligatorio)
            requestData.estado || null,             // Estado: TRUE, FALSE o NULL
            requestData.descripcion,                // Descripción
            requestData.fecha_caducidad,            // Fecha_caducidad (obligatorio)
            requestData.fecha_apertura || null,     // Fecha_apertura (si no se proporciona, mantiene el valor actual)
            requestData.cantidad || null,           // Cantidad
            requestData.comentario || null,         // Comentario
            requestData.id                         // Id de la solicitud a actualizar
        ];
    
        const client = this.createClient();
    
        try {
            await client.connect();
            const result = await client.query(query, values);
            return result.rowCount > 0;  // Retorna true si la actualización es exitosa
        } catch (error) {
            console.error('Error al actualizar la solicitud: ', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    };    

    // Eliminar una solicitud por ID
    removeRequest = async (userId, requestId) => {
        const query = `DELETE FROM request WHERE id_usuario = $1 AND id = $2 RETURNING id`;
        const values = [userId, requestId];
        const client = this.createClient();

        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(query, values);
            return result.rowCount > 0;  // Retorna true si la eliminación es exitosa
        } catch (error) {
            console.error('Error al eliminar la solicitud: ', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    };
}