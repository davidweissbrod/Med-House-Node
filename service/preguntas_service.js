import PreguntaRepository from '../repositories/preguntas_repository.js'

const repo = new PreguntaRepository();

let obj = {
    success: false,
    message: "",
    datos: null
};

export default class PreguntaService{
    async getAllPreguntas(){
        try {
            const res = await repo.getAllPreguntas();
            if (res != null) {
                obj.success = true;
                obj.message = 'Se encontraron las preguntas';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontraron las preguntas';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener las preguntas';
        }
        return obj;
    }

    async getPreguntasById(id){
        try {
            const res = await repo.getPreguntasById(id);
            if (res != null) {
                obj.success = true;
                obj.message = 'Se encontró la pregunta';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se encontró la pregunta con el id proporcionado';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al obtener la pregunta';
        }
        return obj;
    }

    async submitPregunta(pregunta){
        try {
            const res = await repo.submitPregunta(pregunta);
            if (res) {
                obj.success = true;
                obj.message = 'Se subio la pregunta';
                obj.datos = res;
            } else {
                obj.success = false;
                obj.message = 'No se pudo subir la pregunta';
                obj.datos = null;
            }
        } catch (error) {
            obj.message = 'Error al subir la pregunta';
        }
        return obj;
    }
    
    async deletePregunta(id){
        try {
            const rowCount = await repo.deletePregunta(id);
            if (rowCount > 0) {
                obj.success = true;
                obj.message = 'Se eliminó la pregunta';
                obj.datos = { rowCount };
            } else {
                obj.success = false;
                obj.message = 'No se encontró la pregunta a eliminar';
                obj.datos = null;
            }
        } catch (error) {
            if (error.code === '23503') {
                obj.message = 'No se pudo eliminar la pregunta, posible integridad referencial';
            } else {
                obj.message = 'Error al eliminar la pregunta';
            }
        }
        return obj;
    }
}