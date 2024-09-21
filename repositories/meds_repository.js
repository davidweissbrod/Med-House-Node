import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class MedsRepository {

    async getMeds(queryString) {
        const client = new Client(DBConfig);
    
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
            values.push(`%${keyword}%`);  // Buscar coincidencias parciales
            paramIndex++;
        });
    
        try {
            await client.connect();
            const result = await client.query(sql, values); // Ejecuta la consulta
            return result.rows;  // Devuelve los resultados sin procesar
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error al ejecutar la consulta');
        } finally {
            await client.end();  // Cierra la conexión con la base de datos
        }
    }    

    // Obtener un medicamento por su ID
    async getMedicamentoById(id) {
        const client = new Client(DBConfig);
        const sql = 'SELECT * FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error getting med by ID:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Obtener medicamentos por categoría
    async getMedicamentoByCategory(idCategoria) {
        const client = new Client(DBConfig);
        const sql = 'SELECT * FROM public.medicamento WHERE id_categoria = $1';
        const values = [idCategoria];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by category:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Eliminar un medicamento por su ID
    async deleteMedicamentoById(id) {
        const client = new Client(DBConfig);
        const sql = 'DELETE FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error deleting med:', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Obtener medicamentos por droga
    async getMedicamentosByDroga(droga) {
        const client = new Client(DBConfig);
        const sql = 'SELECT id, nombre, descripcion, stock FROM public.medicamento WHERE droga = $1';
        const values = [droga];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by droga:', error);
            return null;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Verificar si un medicamento existe por su ID
    async existsMedicamentoById(id) {
        const client = new Client(DBConfig);
        const sql = 'SELECT COUNT(*) FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return parseInt(result.rows[0].count, 10) > 0; // Retorna true si existe
        } catch (error) {
            console.error('Error checking if med exists by ID:', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }

    // Actualizar la imagen de un medicamento
    async putMedicamentoImage(imageUrl, id) {
        const client = new Client(DBConfig);
        const sql = 'UPDATE public.medicamento SET imagen = $1 WHERE id = $2';
        const values = [imageUrl, id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            return result.rowCount > 0; // Retorna true si se actualizó
        } catch (error) {
            console.error('Error updating med image:', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }
}