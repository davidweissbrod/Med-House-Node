import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;
const client = new Client(DBConfig);

export default class FarmRepository{
    async getFarmaceuticoById(id) {
        const sql = 'SELECT * FROM public.farmaceutico WHERE id = $1';
        const values = [id];
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
            console.error('Error getting user by ID:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }

    async updateFarmaceutico(infoFarm, id) {
        const sql = `
            UPDATE public.farmaceutico
            SET dni = $1, nombre = $2, apellido = $3, titulo = $4, contraseña = $5, email = $6, genero = $7, fotoPerfil = $8, fechaNacimiento = $9, telefono = $10
            WHERE idFarmaceutico = $11
        `;
        const values = [
            infoFarm.dni, 
            infoFarm.nombre, 
            infoFarm.apellido, 
            infoFarm.titulo, 
            infoFarm.contraseña, 
            infoFarm.email, 
            infoFarm.genero, 
            infoFarm.fotoPerfil, 
            infoFarm.fechaNacimiento, 
            infoFarm.telefono, 
            id
        ];
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

    async deleteFarmaceuticoById(id) {
        const sql = 'DELETE FROM public.farmaceutico WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            
            if (result.rowCount > 0) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        } finally {
            await client.end();
        }
    }

    async getFarmByDniPassword(dni, password) {
        const sql = `
            SELECT * FROM public.farmaceutico WHERE dni = $1 AND password = $2;
        `;
        
        const client = new Client(DBConfig);
        
        try {
            // Conectar al cliente
            await client.connect();
            const result = await client.query(sql, [dni, password]);
            
            // Comprobar si el resultado contiene filas
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error fetching DNI and password:', error);
            return null;
        } finally {
            // Asegurarse de cerrar la conexión
            await client.end();
        }
    }
    async insertFarmaceutico(farm){
        const sql = `
        INSERT INTO public.farmaceutico (dni, nombre, apellido, titulo, password, email, genero, Foto_perfil, Fecha_de_nacimiento, telefono)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    const values = [
        farm.dni,
        farm.nombre,
        farm.apellido,
        farm.titulo,
        farm.password,
        farm.email,
        farm.genero,
        farm.fotoPerfil,
        farm.fechaNacimiento,
        farm.telefono,
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
        console.error('Error inserting farm:', error);
        return false;
    } finally {
        // Asegurarse de cerrar la conexión
        await client.end();
    }
    }
}