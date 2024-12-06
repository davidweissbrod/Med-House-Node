import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool(DBConfig);

export default class MedsRepository {
    // Cambiar querys cuando cambiemos la base de datos
    async getMeds(queryString) {
        // Base SQL query: traer todo de medicamento y la categoría relacionada
        let sql = `
            SELECT m.*, c.nombre AS categoria
            FROM public.medicamento m
            JOIN public.categorias c ON m.id_categoria = c.id
            WHERE 1=1 
        `;
    
        // Descomponer el queryString en palabras clave
        const keywords = queryString.split(' ').filter(keyword => keyword.length > 0);
    
        // Array para almacenar los parámetros
        let values = [];
        let paramIndex = 1;
    
        // Para cada palabra clave, aplicar filtros a los campos de interés
        keywords.forEach(keyword => {
            sql += ` AND (
                        m.nombre ILIKE $${paramIndex} OR
                        m.marca ILIKE $${paramIndex} OR
                        m.dosis ILIKE $${paramIndex} OR
                        m.forma_farm ILIKE $${paramIndex} OR
                        m.droga ILIKE $${paramIndex} OR
                        c.nombre ILIKE $${paramIndex}
                    )`;
            values.push(`%${keyword}%`); // Buscar coincidencias parciales
            paramIndex++;
        });
    
        try {
            const result = await pool.query(sql, values); // Ejecuta la consulta
            return result.rows; // Devuelve los resultados sin procesar
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error al ejecutar la consulta');
        }
    }
    

    async getMedicamentoById(id) {
        const sql = 'SELECT * FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            const result = await pool.query(sql, values);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error getting med by ID:', error);
            return null;
        }
    }

    async getMedicamentoByCategory(idCategoria, limit = null, offset = null) {
        let sql = `SELECT * FROM public.medicamento WHERE id_categoria = $1 ORDER BY stock DESC`;
        const values = [idCategoria];

        if (limit !== null) {
            sql += ` LIMIT $2`;
            values.push(limit);
        }

        if (offset !== null) {
            sql += limit !== null ? ` OFFSET $3` : ` OFFSET $2`;
            values.push(offset);
        }

        try {
            const result = await pool.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by category:', error);
            return null;
        }
    }

    async deleteMedicamentoById(id) {
        const sql = 'DELETE FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            const result = await pool.query(sql, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error deleting med:', error);
            return false;
        }
    }

    async existsMedicamentoById(id) {
        const sql = 'SELECT COUNT(*) FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            const result = await pool.query(sql, values);
            return parseInt(result.rows[0].count, 10) > 0;
        } catch (error) {
            console.error('Error checking if med exists by ID:', error);
            return false;
        }
    }

    async putMedicamentoImage(imageUrl, id) {
        const sql = 'UPDATE public.medicamento SET imagen = $1 WHERE id = $2';
        const values = [imageUrl, id];
        try {
            const result = await pool.query(sql, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error updating med image:', error);
            return false;
        }
    }

    async getMedByName(med) {
        const sql = 'SELECT nombre FROM public.medicamento WHERE nombre LIKE $1%';
        const values = [med];
        try {
            const result = await pool.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by nombre:', error);
            return null;
        }
    }
}