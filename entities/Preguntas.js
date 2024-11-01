export default class Preguntas {
    idUsuario;
    idMedicamento;
    pregunta;
    respuesta;
    fecha;

    constructor(idUsuario, idMedicamento, pregunta, respuesta = null) {
        this.idUsuario = idUsuario;
        this.idMedicamento = idMedicamento;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
    }
}
