import FarmaceuticoRepository from "../repositories/farm_repository";
const repo = new FarmaceuticoRepository();

export default class FarmaceuticoService{
    async getAllAsync() {
        try{
            return await repo.getAllAsync()
        } catch(e){
            return new Error('No se pudieron obtener los farmaceuticos: ' + e.message);
        }
    }

    async getFarmaceuticoById(id){
        try{
            return await repo.getFarmaceuticoById(id)
        } catch(e){
            return new Error('No se pudo obtener el farmaceutico: ' + e.message);
        }
    }

    async insertFarmacetico(farmaceutico){
        try{
            return await repo.insertFarmacetico(farmaceutico)
        } catch(e){
            return new Error('No se pudo insertar el farmaceutico: ' + e.message);
        }
    }

    async updateFarmaceutico(farmaceutico){
        try{
            return await repo.updateFarmaceutico(farmaceutico)
        } catch(e){
            return new Error('No se pudo actualizar el farmaceutico: ' + e.message);
        }
    }
}