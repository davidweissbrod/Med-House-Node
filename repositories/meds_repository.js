import SQL_Helper from '../helpers/sql-helper.js'
const helpBD = new SQL_Helper();

export default class MedsRepository{
    async getAllAsync() {
        const sql = 'SELECT * FROM Medicamento';
        let res = await helpBD.SQLQuery(sql);
        return res.rows;
    }

    async getMedicamentoById(id) {
        const sql = 'SELECT * FROM Medicamento WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows[0];
    }

    async getMedicamentoByCategory(idCategoria) {
        const sql = 'SELECT * FROM Medicamento WHERE idCategoria = $1';
        const values = [idCategoria];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows;
    }

    /*async insertMedicamento(medicamento) {
        const sql = `
            INSERT INTO Medicamento(nombre, descripcion, idCategoria, precio, stock)
            VALUES($1, $2, $3, $4, $5)
        `;
        const values = [
            medicamento.nombre,
            medicamento.marca,
            medicamento.dosis,
            medicamento.formaFarm,
            medicamento.droga,
            medicamento.idCategoria,
            medicamento.descripcion,
            medicamento.stock
        ];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }

    async updateMedicamento(id, medicamento) {
        const sql = `
            UPDATE Medicamento
            SET nombre = $1, descripcion = $2, idCategoria = $3, precio = $4, stock = $5
            WHERE idMedicamento = $6
        `;
        const values = [
            medicamento.nombre,
            medicamento.marca,
            medicamento.dosis,
            medicamento.formaFarm,
            medicamento.droga,
            medicamento.idCategoria,
            medicamento.descripcion,
            medicamento.stock,
            id
        ];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }*/

    async deleteMedicamentoById(id) {
        const sql = 'DELETE FROM Medicamento WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rowCount !== 0;
    }
}