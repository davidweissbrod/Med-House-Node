import FarmaceuticoRepository from "../repositories/farm_repository";
import Helper from '../helpers/sql-helper'
const repo = new FarmaceuticoRepository();
const SQLHelper = new Helper();

export default class FarmaceuticoService{
    async getFarmaceuticoById(id){
        const sql = 'SELECT idFarmaceutico FROM Usuario WHERE idFarmaceutico = $1' 
        const values = [id];
        let rowCount =  await SQLHelper.SQLQuery(sql, values);
        rowCount = res.rows[0].count;
        let res = await repo.getFarmaceuticoById(id)
        if(res.rowCount < 0){
            obj.status = 404
            obj.message = 'No se encontro el id del farmaceutico'
            obj.datos = null
        } else{
            obj.status = 200,
            obj.message = 'Se encontro el farmaceutico'
            obj.success = true
            obj.datos = { rowCount }
        }
        return obj
    }

    async insertFarmacetico(farmaceutico){
        //Se hace con el register
    }

    async updateFarmaceutico(farmaceutico){
            try {
                const rowCount = await repo.deleteUserById(id);
                if (rowCount > 0) {
                    obj.success = true;
                    obj.message = "Se actualizo el farmaceutico";
                    obj.datos = { rowCount };
                } else {
                    obj.success = false;
                    obj.message = "No se encontró el farmaceutico para eliminar";
                    obj.datos = null;
                }
            } catch (error) {
                if (error.code === '23503') {
                    obj.success = false;
                    obj.message = "No se pudo actualizar el farmaceutico";
                    obj.datos = null;
                } else {
                    obj.success = false;
                    obj.message = "Error al actualizar el farmaceutico";
                    obj.datos = null;
                }
            }
            return obj
    }
    deleteFarmaceuticoById = async (id) => {
        try {
            const rowCount = await repo.deleteFarmaceuticoById(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = "Se elimino el farmaceutico";
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = "No se encontró el farmaceutico para eliminar";
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.success = false;
                obj.message = "No se pudo eliminar el farmaceutico";
                obj.datos = null;
            } else {
                obj.success = false;
                obj.message = "Error al eliminar el farmcaeutico";
                obj.datos = null;
            }
        }
        return obj;
    };
}