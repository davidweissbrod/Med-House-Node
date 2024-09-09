import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client(DBConfig);

export default class CategoryRepository{

    async getAllCategories(){
        const sql = 'SELECT * FROM Categoria'
        try {
            await client.connect();
            const result = await client.query(sql);
            // Verificar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting categories:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async getCategoryById(id) {
        const sql = 'SELECT * FROM Categoria WHERE id = $1';
        const values = [id];
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting category by ID:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }
}