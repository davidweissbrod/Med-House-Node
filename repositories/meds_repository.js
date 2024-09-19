import DBConfig from '../configs/dbconfig.js';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client(DBConfig);

export default class MedsRepository {
    constructor() {
        this.init();
    }

    async init() {
        try {
            await client.connect();
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }

    async getAllMedicamentos() {
        const sql = 'SELECT * FROM public.medicamento';
        try {
            const result = await client.query(sql);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds:', error);
            return null;
        }
    }

    async getMedicamentoById(id) {
        const sql = 'SELECT * FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (error) {
            console.error('Error getting med by ID:', error);
            return null;
        }
    }

    async getMedicamentoByCategory(idCategoria) {
        const sql = 'SELECT * FROM public.medicamento WHERE Id_categoria = $1';
        const values = [idCategoria];
        try {
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by category:', error);
            return null;
        }
    }

    async deleteMedicamentoById(id) {
        const sql = 'DELETE FROM public.medicamento WHERE id = $1';
        const values = [id];
        try {
            const result = await client.query(sql, values);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error deleting med:', error);
            return false;
        }
    }

    async getMedicamentosByDroga(droga) {
        const sql = 'SELECT Id, Nombre, Descripcion, Stock FROM public.medicamento WHERE Droga = $1';
        const values = [droga];
        try {
            const result = await client.query(sql, values);
            return result.rows.length > 0 ? result.rows : null;
        } catch (error) {
            console.error('Error getting meds by droga:', error);
            return null;
        }
    }
}