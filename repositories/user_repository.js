import SQL_Helper from '../helpers/sql-helper.js'
const helpBD = new SQL_Helper();

export default class UserRepository {
    async getUserById(id){
        const sql = 'SELECT idUsuario FROM Usuarios WHERE idUsuario = $1'
        const values = [id]
        let res = await helpBD.SQLQuery(sql, values)
        return res.rows[0]
    }
    async updateUser(user) {
        const sql = `
            UPDATE Usuario
            SET DNI = @dni, Nombre = @nombre, Apellido = @apellido, Contraseña = @contraseña, Email = @email, 
                fotoDePerfil = @fotoPerfil, fechaNacimiento = @fechaNacimiento, Genero = @genero, Telefono = @telefono
            WHERE idUsuario = @idUsuario;
        `;
        
        // Crear un objeto de parámetros
        const params = {
            idUsuario: user.idUsuario,
            dni: user.dni,
            nombre: user.nombre,
            apellido: user.apellido,
            contraseña: user.contraseña,
            email: user.email,
            fotoPerfil: user.fotoPerfil,
            fechaNacimiento: user.fechaNacimiento,
            genero: user.genero,
            telefono: user.telefono
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
            console.error('Error updating user:', error);
            return false;
        }
    }    
    async deleteUserById(id) {
        const sql = `
            DELETE FROM Usuario WHERE idUsuario = @idUsuario;
        `;
        
        // Crear un objeto de parámetros
        const params = {
            idUsuario: id
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
            console.error('Error deleting user:', error);
            return false;
        }
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
    async getUserByDniPassword(dni, contraseña) {
        const sql = `
            SELECT * FROM Usuario WHERE DNI = @dni AND Contraseña = @contraseña;
        `;
        
        // Crear un objeto de parámetros
        const params = {
            dni: dni,
            contraseña: contraseña
        };
        
        try {
            // Ejecutar la consulta
            let res = await helpBD.SQLQuery(sql, params);
            
            // Comprobar si res no es null y tiene propiedad recordset
            if (res && res.recordset && res.recordset.length > 0) {
                return res.recordset[0];
            }
            return null;
        } catch (error) {
            // Manejo de errores
            console.error('Error fetching user by DNI and password:', error);
            return null;
        }
    }    
}