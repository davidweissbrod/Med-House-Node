import SQL_Helper from '../helpers/sql-helper.js'
const helpBD = new SQL_Helper();

export default class CategoryRepository{
    async getCategoryById(id) {
        const sql = 'SELECT * FROM Categoria WHERE id = $1';
        const values = [id];
        let res = await helpBD.SQLQuery(sql, values);
        return res.rows[0];
    }
}