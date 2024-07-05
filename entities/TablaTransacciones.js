export default class TablaTransacciones {
    idUsuario;
    idMedicamento;
    tarjeta;

    constructor(idUsuario, idMedicamento, tarjeta) {
        this.idUsuario = idUsuario;
        this.idMedicamento = idMedicamento;
        this.tarjeta = tarjeta;
    }
}
