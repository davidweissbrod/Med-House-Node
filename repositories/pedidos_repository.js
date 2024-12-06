import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool(DBConfig); // Crear un pool de conexiones con la configuración

export default class PedidosRepository {
    // Obtener todos los pedidos de un usuario
    async getAllRequests(userId) {
        const sql = `
            SELECT * FROM public.pedidos WHERE id_usuario = $1`;
        const values = [userId];
        try {
            const result = await pool.query(sql, values); // Usar pool para la consulta
            return result.rows.length > 0 ? result.rows : []; // Devolver las filas obtenidas o vacío
        } catch (error) {
            console.error('Error getting requests:', error);
            return [];
        }
    }

    // Obtener los detalles de un pedido de un usuario
    async getRequestById(id) {
        const sql = `
            SELECT id_medicamento FROM detallepedidos WHERE id_pedidos = $1`;
        const values = [id]; // Solo necesitamos el id del pedido
        try {
            const result = await pool.query(sql, values); // Usar pool para la consulta
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting request by ID:', error);
            return null;
        }
    }

    async getRequestInfo(id) {
        const sql = `
            SELECT * FROM pedidos WHERE id = $1`;
        const values = [id]; // Solo necesitamos el id del pedido
        try {
            const result = await pool.query(sql, values); // Usar pool para la consulta
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting request by ID:', error);
            return null;
        }
    }

    // Insertar un pedido a la base de datos
    async postRequest(userId) {
        const sql = `
            INSERT INTO public.pedidos (id_usuario, fecha_pedido) VALUES ($1, NOW()) RETURNING *`; // SQL para insertar
        const values = [userId]; // Solo necesitamos el id del usuario
        try {
            const result = await pool.query(sql, values); // Usar pool para la consulta
            return result.rowCount > 0 ? result.rows[0] : null; // Devolver la fila insertada o null
        } catch (error) {
            console.error('Error saving request:', error);
            return null; // Retornar null en caso de error
        }
    }

    async addMedicamentoToDetalle(pedidoId, medId) {
        const sql = `
            INSERT INTO public.detallepedidos (id_medicamento, id_pedidos) VALUES ($1, $2) RETURNING *`; // SQL para insertar
        const values = [medId, pedidoId];
        try {
            const result = await pool.query(sql, values); // Usar pool para la consulta
            return result.rowCount > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error adding medication to request:', error);
            return null; // Retornar null en caso de error
        }
    }

    // Eliminar todas las búsquedas de un usuario
    async deleteRequest(userId, requestId) {
        const sqlDeleteDetalle = `
            DELETE FROM public.detallepedidos WHERE id_pedidos = $1`; // Eliminar los detalles del pedido
        const sqlDeletePedido = `
            DELETE FROM public.pedidos WHERE id_usuario = $1 AND id = $2`; // Eliminar el pedido
        const valuesDetalle = [requestId]; // El id del pedido
        const valuesPedido = [userId, requestId]; // Los valores para eliminar el pedido

        try {
            await pool.query(sqlDeleteDetalle, valuesDetalle); // Usar pool para la primera consulta
            const result = await pool.query(sqlDeletePedido, valuesPedido); // Usar pool para la segunda consulta
            return result.rowCount; // Retornar la cantidad de filas eliminadas
        } catch (error) {
            console.error('Error deleting request:', error);
            return 0; // Retornar 0 en caso de error
        }
    }
}