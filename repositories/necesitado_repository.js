import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class NecesitadoRepository {
    // Get all Necesitados for a user with detailed medication info
    async getAllNecesitadosByUserId(userId) {
        const sql = `
            SELECT n.Id_usuario, n.Id_medicamento, m.Nombre AS medicamento_name, m.Descripcion AS medicamento_description
            FROM necesitados n
            JOIN medicamento m ON n.Id_medicamento = m.Id
            WHERE n.Id_usuario = $1;
        `;
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [userId]);
            
            // Verificar si se encontraron filas
            if (result.rows.length > 0) {
                return result;  // Devuelve todo el objeto result para acceder a rows y rowCount
            }
            return { rows: [], rowCount: 0 };
        } catch (error) {
            // Manejo de errores
            console.error('Error fetching necesitados by user ID:', error);
            return { rows: [], rowCount: 0 };
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }    

    // Add a Necesitado
    async addNecesitado(userId, idMedicamento) {
        const sql = `
            INSERT INTO necesitados (user_id, medicamento_id)
            VALUES ($1, $2);
        `;
        
        const values = [userId, idMedicamento];
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            // Comprobar si se afectaron filas
            return result.rowCount > 0;
        } catch (error) {
            // Manejo de errores
            console.error('Error adding necesario:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    // Remove a Necesitado
    async removeNecesitado(userId, idMedicamento) {
        const sql = `
            DELETE FROM necesitados WHERE user_id = $1 AND medicamento_id = $2;
        `;
        
        const values = [userId, idMedicamento];
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            // Comprobar si se afectaron filas
            return result.rowCount > 0;
        } catch (error) {
            // Manejo de errores
            console.error('Error removing necesario:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }
}