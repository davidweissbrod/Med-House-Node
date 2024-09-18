import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client(DBConfig);

export default class BolsaRepository{
    async getUserBolsa(idUser){
        const sql = 'SELECT Id_usuario FROM public.bolsa WHERE Id_usuario = $1'
        const values = [idUser]
        try {
            await client.connect();
            const result = await client.query(sql, values);
            // Verificar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting bolsa:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async updateBolsa(med){
        const sql = 'INSERT INTO public.bolsa VALUES = $1, $2, $3, $4, $5, $6, $7, $8'
        const values = [med.nombre, med.marca, med.dosis, med.formaFarm, med.droga, med.idCategoria, med.descripcion, med.stock]
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);

            if (result.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            // Manejo de errores
            console.error('Error updating bolsa:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async deleteMedBolsa(idMed){
        const sql = 'DELETE FROM bolsa WHERE Id_medicamento = $1'
        const values = [idMed]
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
            console.error('Error deleting med from bolsa:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }    
}
