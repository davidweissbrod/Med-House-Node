import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

export default class CategoryRepository {

    async getAllCategories() {
        const client = new Client(DBConfig);
        const sql = 'SELECT * FROM public.categorias';
        try {
            await client.connect();
            const result = await client.query(sql);
            if (result.rows.length > 0) {
                return result.rows;
            }
            return null;
        } catch (error) {
            console.error('Error getting categories:', error);
            return null;
        } finally {
            await client.end();
        }
    }

    async getCategoryById(id) {
        const client = new Client(DBConfig);
        const sql = 'SELECT * FROM public.categorias WHERE id = $1';
        const values = [id];
        try {
            await client.connect();
            const result = await client.query(sql, values);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error getting category by ID:', error);
            return null;
        } finally {
            await client.end();
        }
    }
}