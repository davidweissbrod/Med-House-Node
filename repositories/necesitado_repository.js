import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class NecesitadoRepository {
    // Get all Necesitados for a user with detailed medication info
    async getAllNecesitadosByUserId(userId) {
        const sql = `
            SELECT Id_medicamento
            FROM necesitados
            WHERE Id_usuario = $1;
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

    async getNecesitadoById(userId, idMedicamento) {
        const sql = `
            SELECT *
            FROM necesitados
            WHERE Id_usuario = $1 AND Id_medicamento = $2;
        `;
        
        const client = new Client(DBConfig);

        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [userId, idMedicamento]);
            // Verificar si se encontraron filas
            return result.rows.length > 0; // Retorna true si se encontró el medicamento, false si no
        } catch (error) {
            // Manejo de errores
            console.error('Error fetching necesitados by user ID and medication ID:', error);
            return false; // Retorna false en caso de error
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }
    

    // Add a Necesitado
    async addNecesitado(userId, idMedicamento) {
        const sql = `
            INSERT INTO necesitados (id_usuario, id_medicamento)
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
            DELETE FROM necesitados WHERE id_usuario = $1 AND id_medicamento = $2;
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