import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client(DBConfig);

export default class MedsRepository{
    async getAllMedicamentos() {
        const sql = 'SELECT * FROM medicamento';
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
            console.error('Error getting meds:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async getMedicamentoById(id) {
        const sql = 'SELECT * FROM medicamento WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error getting med by ID:', error);
            return null;
        } finally {
            await client.end();
        }
    }

    async getMedicamentoByCategory(idCategoria) {
        const sql = 'SELECT * FROM medicamento WHERE Id_categoria = $1';
        const values = [idCategoria];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (error) {
            console.error('Error getting med:', error);
            return null;
        } finally {
            await client.end();
        }
    }


    async deleteMedicamentoById(id) {
        const sql = 'DELETE FROM medicamento WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            
            if (result.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting med:', error);
            return false;
        } finally {
            await client.end();
        }
    }
}