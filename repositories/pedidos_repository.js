import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class PedidosRepository {

    // Obtener todos los pedidos de un usuario
    async getAllRequests(userId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = `
            SELECT id, fecha_pedido, id_usuario FROM public.pedidos WHERE id_usuario = $1`;
        const values = [userId];
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);  // Ejecutar la consulta
            // Devolver las filas obtenidas o un array vacío
            return result.rows.length > 0 ? result.rows : [];
        } catch (error) {
            console.error('Error getting requests:', error);
            return [];
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }    

    // Obtener los detalles de un pedido de un usuario
    async getRequestById(id) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = `
            SELECT id_medicamento FROM detallepedidos WHERE id_pedidos = $1`;
        const values = [id];  // Solo necesitamos el id del pedido
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);  // Ejecutar la consulta
            // Devolver la fila encontrada o null si no existe
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting request by ID:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    async getRequestInfo(id) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = `
            SELECT * FROM pedidos WHERE id = $1`;
        const values = [id];  // Solo necesitamos el id del pedido
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);  // Ejecutar la consulta
            // Devolver la fila encontrada o null si no existe
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting request by ID:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Insertar un pedido a la base de datos
    async postRequest(userId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'INSERT INTO public.pedidos (id_usuario, fecha_pedido) VALUES ($1, NOW()) RETURNING *';  // SQL para insertar
        const values = [userId];  // Solo necesitamos el id del usuario
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);  // Ejecutar la consulta
            // Verificar si se inserta correctamente
            return result.rowCount > 0 ? result.rows[0] : null;  // Devolver la fila insertada o null
        } catch (error) {
            console.error('Error saving request:', error);
            return null;  // Retornar null en caso de error
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    async addMedicamentoToDetalle (pedidoId, medId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'INSERT INTO public.detallepedidos (id_medicamento, id_pedidos) VALUES ($1, $2) RETURNING *';  // SQL para insertar
        const values = [medId, pedidoId];  // Solo necesitamos el id del usuario
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);  // Ejecutar la consulta
            // Verificar si se inserta correctamente
            return result.rowCount > 0 ? result.rows[0] : null;  // Devolver la fila insertada o null
        } catch (error) {
            console.error('Error saving request:', error);
            return null;  // Retornar null en caso de error
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Eliminar todas las búsquedas de un usuario
    async deleteRequest(userId, requestId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sqlDeleteDetalle = 'DELETE FROM public.detallepedidos WHERE id_pedidos = $1';  // Eliminar los detalles del pedido
        const sqlDeletePedido = 'DELETE FROM public.pedidos WHERE id_usuario = $1 AND id = $2';  // Eliminar el pedido
        const valuesDetalle = [requestId];  // El id del pedido
        const valuesPedido = [userId, requestId];  // Los valores para eliminar el pedido
    
        try {
            await client.connect();  // Conectar al cliente
            // Primero, eliminamos los detalles del pedido
            await client.query(sqlDeleteDetalle, valuesDetalle);
            // Luego, eliminamos el pedido
            const result = await client.query(sqlDeletePedido, valuesPedido);
            return result.rowCount;  // Retornar la cantidad de filas eliminadas
        } catch (error) {
            console.error('Error deleting request:', error);
            return 0;  // Retornar 0 en caso de error
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }    
}