import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class BolsaRepository {
    async getUserBolsa(idUser) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'SELECT * FROM public.bolsa WHERE id_usuario = $1';
        const values = [idUser];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            if (result.rows.length > 0) {
                return result.rows;  // Devolver las filas obtenidas
            }
            return [];
        } catch (error) {
            console.error('Error getting bolsa:', error);
            return [];
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    async checkMedInBolsa(idUser, idMed) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'SELECT * FROM public.bolsa WHERE id_usuario = $1 AND id_medicamento = $2';
        const values = [idUser, idMed];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rowCount > 0;  // Devolver true si existe el medicamento en la bolsa
        } catch (error) {
            console.error('Error checking medication in bolsa:', error);
            return false;  // En caso de error, devolver false
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }    

    async postMedBolsa(idUser, idMed) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'INSERT INTO public.bolsa (id_usuario, id_medicamento) VALUES ($1, $2)';
        const values = [idUser, idMed];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rowCount;
        } catch (error) {
            console.error('Error inserting into bolsa:', error);
            return 0;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    async deleteMedBolsa(idUser, idMed) {
        const client = new Client(DBConfig);  // Crear una nueva instancia de Client
        const sql = 'DELETE FROM public.bolsa WHERE id_usuario = $1 AND id_medicamento = $2';
        const values = [idUser, idMed];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rowCount;
        } catch (error) {
            console.error('Error deleting from bolsa:', error);
            return 0;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }
}