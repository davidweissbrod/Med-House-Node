import SQL_Helper from '../helpers/sql-helper.js'
const helpBD = new SQL_Helper();

export default class FarmRepository{
    async getAllAsync() {
        const sql = 'SELECT * FROM Farmaceutico';
        let res = await helpBD.SQLQuery(sql);
        return res.rows;
    }

    async getFarmaceuticoById(id) {
        const sql = 'SELECT * FROM Farmaceutico WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows[0];
    }

    async insertFarmaceutico(id, farmaceutico) {
        const sql = `
            INSERT INTO Farmaceutico(dni, nombre, apellido, titulo, contraseña, email, genero, fotoPerfil, fechaNacimiento, telefono)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const values = [
            farmaceutico.dni, 
            farmaceutico.nombre, 
            farmaceutico.apellido, 
            farmaceutico.titulo, 
            farmaceutico.contraseña, 
            farmaceutico.email, 
            farmaceutico.genero, 
            farmaceutico.fotoPerfil, 
            farmaceutico.fechaNacimiento, 
            farmaceutico.telefono,
            id
        ];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }

    async updateFarmaceuticoById(id, farmaceutico) {
        const sql = `
            UPDATE Farmaceutico
            SET dni = $1, nombre = $2, apellido = $3, titulo = $4, contraseña = $5, email = $6, genero = $7, fotoPerfil = $8, fechaNacimiento = $9, telefono = $10
            WHERE idFarmaceutico = $11
        `;
        const values = [
            farmaceutico.dni, 
            farmaceutico.nombre, 
            farmaceutico.apellido, 
            farmaceutico.titulo, 
            farmaceutico.contraseña, 
            farmaceutico.email, 
            farmaceutico.genero, 
            farmaceutico.fotoPerfil, 
            farmaceutico.fechaNacimiento, 
            farmaceutico.telefono, 
            id
        ];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }

    async deleteFarmaceuticoById(id) {
        const sql = 'DELETE FROM Farmaceutico WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }

    async getFarmaceuticoByDniPassword(dni, contraseña) {
        const sql = 'SELECT * FROM Farmaceutico WHERE dni = $1 AND contraseña = $2';
        const values = [dni, contraseña];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows[0];
    }
}