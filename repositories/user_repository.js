import SQL_Helper from '../helpers/sql-helper.js'
const helpBD = new SQL_Helper();

export default class UserRepository {
    async getUserById(id){
        const sql = 'SELECT idUsuario FROM Usuarios WHERE idUsuario = $1'
        const values = [id]
        let res = await helpBD.SQLQuery(sql, values)
        return res.rows[0]
    }
    async updateUser(user){
        const sql = 'UPDATE Usuario SET dni = $1, nombre = $2, apellido = $3, contraseña = $4, email = $5, fotoPerfil = $6, fechaNacimiento = $7, genero = $8, telefono = $9 WHERE idUsuario = $10'
        const values = [user.dni, user.nombre, user.apellido, user.contraseña, user.email, user.fotoPerfil, user.fechaNacimiento, user.genero, user.telefono, id]
        let res = await helpBD.SQLQuery(sql, values)
        if(res.rowCount != 0){
            return true;
        }
        return false;   
    }
    async deleteUserById(id){
        const sql = 'DELETE Usuario WHERE idUsuario = $1'
        const values = [id]
        let res = await helpBD.SQLQuery(sql, values)
        if(res.rowCount != 0){
            return true;
        }
        return false;    
    }
    async insertUser(user) {
        const sql = `
            INSERT INTO Usuario (DNI, Nombre, Apellido, Contraseña, Email)
            VALUES (@dni, @nombre, @apellido, @contraseña, @email);
        `;
    
        // Crear un objeto de parámetros
        const params = {
            dni: user.dni,
            nombre: user.nombre,
            apellido: user.apellido,
            contraseña: user.password,
            email: user.email
        };
        
        try {
            // Ejecutar la consulta
            let res = await helpBD.SQLQuery(sql, params);
            
            // Comprobar si res no es null y tiene propiedad rowsAffected
            if (res && res.rowsAffected && res.rowsAffected[0] > 0) {
                return true;
            }
            return false;
        } catch (error) {
            // Manejo de errores
            console.error('Error inserting user:', error);
            return false;
        }
    }
    async getUserByDniPassword(dni, contraseña){
        const sql = 'SELECT * FROM Usuario WHERE dni = $1 AND contraseña = $2'
        const values = [dni, contraseña]
        let res = await helpBD.SQLQuery(sql, values)
        return res.rows[0]
    }
}
