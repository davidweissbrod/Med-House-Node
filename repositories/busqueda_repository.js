import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class BusquedaRepository {

    // Obtener todas las búsquedas de un usuario
    async getAllSearchByUser(userId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'SELECT * FROM public.busqueda WHERE id_usuario = $1';
        const values = [userId];
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows : [];  // Devolver las filas obtenidas o un array vacío
        } catch (error) {
            console.error('Error getting searches:', error);
            return [];
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Guardar una nueva búsqueda
    async saveSearch(userId, query) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'INSERT INTO public.busqueda (id_usuario, busqueda) VALUES ($1, $2) RETURNING *';
        const values = [userId, query];
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rowCount > 0 ? result.rows[0] : null;  // Devolver la fila insertada o null
        } catch (error) {
            console.error('Error saving search:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Eliminar una búsqueda por ID
    async deleteSearchById(userId, searchId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'DELETE FROM public.busqueda WHERE id_usuario = $1 AND id = $2';
        const values = [userId, searchId];
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rowCount;  // Devolver la cantidad de filas eliminadas
        } catch (error) {
            console.error('Error deleting search by ID:', error);
            return 0;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Eliminar todas las búsquedas de un usuario
    async deleteAllSearch(userId) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'DELETE FROM public.busqueda WHERE id_usuario = $1';
        const values = [userId];
        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rowCount;  // Devolver la cantidad de filas eliminadas
        } catch (error) {
            console.error('Error deleting all searches:', error);
            return 0;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }
}