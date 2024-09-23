import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool(DBConfig); // Crear una instancia de Pool

export default class BolsaRepository {
    async getUserBolsa(idUser) {
        const sql = 'SELECT * FROM public.bolsa WHERE id_usuario = $1';
        const values = [idUser];
        try {
            const result = await pool.query(sql, values);
            if (result.rows.length > 0) {
                return result.rows; // Devolver las filas obtenidas
            }
            return [];
        } catch (error) {
            console.error('Error getting bolsa:', error);
            return [];
        }
    }

    async checkMedInBolsa(idUser, idMed) {
        const sql = 'SELECT * FROM public.bolsa WHERE id_usuario = $1 AND id_medicamento = $2';
        const values = [idUser, idMed];
        try {
            const result = await pool.query(sql, values);
            return result.rowCount > 0; // Devolver true si existe el medicamento en la bolsa
        } catch (error) {
            console.error('Error checking medication in bolsa:', error);
            return false; // En caso de error, devolver false
        }
    }    

    async postMedBolsa(idUser, idMed) {
        const sql = 'INSERT INTO public.bolsa (id_usuario, id_medicamento) VALUES ($1, $2)';
        const values = [idUser, idMed];
        try {
            const result = await pool.query(sql, values);
            return result.rowCount;
        } catch (error) {
            console.error('Error inserting into bolsa:', error);
            return 0;
        }
    }

    async deleteMedBolsa(idUser, idMed) {
        const sql = 'DELETE FROM public.bolsa WHERE id_usuario = $1 AND id_medicamento = $2';
        const values = [idUser, idMed];
        try {
            const result = await pool.query(sql, values);
            return result.rowCount;
        } catch (error) {
            console.error('Error deleting from bolsa:', error);
            return 0;
        }
    }
}