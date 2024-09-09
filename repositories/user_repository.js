import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class UserRepository {
    async getUserById(id) {
        const sql = 'SELECT id FROM usuario WHERE id = $1';
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [id]);
            
            // Verificar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error getting user by ID:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async updateUser(user) {
        const sql = `
            UPDATE usuario
            SET dni = $1, nombre = $2, apellido = $3, password = $4, email = $5, 
                foto_perfil = $6, fecha_nacimiento = $7, genero = $8, telefono = $9
            WHERE id = $10;
        `;
        
        const values = [
            user.dni,
            user.nombre,
            user.apellido,
            user.password,
            user.email,
            user.foto_perfil,
            user.fecha_nacimiento,
            user.genero,
            user.telefono,
            user.id
        ];
        
        const client = new Client(DBConfig);
        
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
            console.error('Error updating user:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }    

    async deleteUserById(id) {
        const sql = `
            DELETE FROM usuario WHERE id = $1;
        `;
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [id]);
            
            // Comprobar si se afectaron filas
            if (result.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            // Manejo de errores
            console.error('Error deleting user:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }    

    async insertUser(user) {
        const sql = `
            INSERT INTO usuario (dni, nombre, apellido, password, email)
            VALUES ($1, $2, $3, $4, $5);
        `;
    
        const values = [
            user.dni,
            user.nombre,
            user.apellido,
            user.password,
            user.email
        ];
        
        const client = new Client(DBConfig);
        
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
            console.error('Error inserting user:', error);
            return false;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async getUserByDniPassword(dni, password) {
        const sql = `
            SELECT * FROM usuario WHERE dni = $1 AND password = $2;
        `;
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [dni, password]);
            
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error fetching user by DNI and password:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }
}