import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class PrioritariosRepository{
    getPrioritariosById = async (id) => {
        const sql = 'SELECT * FROM public.prioritarios WHERE id = $1'
        const values = [id]

        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            // Verificar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting prioritario by ID:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    postNewPrioritario = async (idUs, idCat) => {
        const sql = 'INSERT INTO public.prioritario(id_usuario, id_medicamento) VALUES($1, $2)'
        const values = [idUs, idCat]
        const client = new Client(DBConfig)

        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            // Comprobar si se afectaron filas
            if (result.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            // Manejo de errores
            console.error('Error inserting user:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    deletePrioritario = async (id) => {
        const sql = 'DELETE FROM public.prioritario WHERE id = $1'
        const values = [id]
        const client = new Client(DBConfig)

        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rowCount > 0;  // Retorna true si la eliminación es exitosa
        } catch (error) {
            console.error('Error al eliminar la solicitud: ', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }
}