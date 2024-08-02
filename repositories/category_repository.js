import SQL_Helper from '../helpers/sql-helper'
const helpBD = new SQL_Helper();
let obj = {
    success: false,
    status: 0,
    message: "",
    datos: null
}


export default class CategoryRepository{
    async getCategoryById(id) {
        const sql = 'SELECT * FROM Categoria WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows[0];
    }
}