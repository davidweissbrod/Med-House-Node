import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class PreguntaRepository{
    
    getAllPreguntas = async () => {
        const sql = 'SELECT * FROM public.preguntas'
        const client = new Client(DBConfig);

        try {
            await client.connect();
            const result = await client.query(sql);
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (error) {
            console.error('Error getting preguntas:', error);
            return null;
        } finally {
            await client.end();
        }
    }
    
    getPreguntasById = async (id) => {
        const sql = 'SELECT * FROM public.preguntas WHERE id = $1'
        const values = [id]

        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, values);
            
            // Verificar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting pregunta by ID:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    submitPregunta = async (pregunta) => {
        const sql = 'INSERT INTO public.preguntas(Id_usuario, Id_medicamento, Pregunta, Respuesta, Fecha) VALUES($1, $2, $3, $4, $5)'
        const values = [
            pregunta.idUsuario,
            pregunta.idMedicamento,
            pregunta.pregunta,
            pregunta.respuesta,
            pregunta.fecha
        ]

        const client = new Client(DBConfig)

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
            console.error('Error inserting pregunta:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    deletePregunta = async (id) => {
        const sql = 'DELETE FROM public.preguntas WHERE id = $1'
        const values = [id]
        const client = new Client(DBConfig)

        try {
            await client.connect();  // Conectar al cliente
            const result = await client.query(sql, values);
            return result.rowCount > 0;  // Retorna true si la eliminación es exitosa
        } catch (error) {
            console.error('Error al eliminar la pregunta: ', error);
            return false;
        } finally {
            await client.end();  // Cerrar la conexión
        }
    }
}