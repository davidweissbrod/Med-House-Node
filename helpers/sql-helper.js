import sql from 'mssql';  // Importa el paquete mssql
import config from "../configs/dbconfig.js";

export default class SQLQuery {
    async SQLQuery(query, params = {}) {
        let ret = null;
        try {
            // Crear una conexión con la base de datos
            let pool = await sql.connect(config);
            
            // Preparar la solicitud
            let request = pool.request();
            
            // Asignar parámetros a la solicitud
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
            
            // Ejecutar la consulta
            ret = await request.query(query);
        } catch (error) {
            console.error('Database query error:', error);
        } finally {
            // Cerrar la conexión
            await sql.close();
            return ret;
        }
    }
}