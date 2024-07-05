export default class MedicamentosDonados {
    idUsuario;
    idMedicamento;
    idFarmaceutico;

    constructor(idUsuario, idMedicamento, idFarmaceutico) {
        this.idUsuario = idUsuario;
        this.idMedicamento = idMedicamento;
        this.idFarmaceutico = idFarmaceutico;
    }
}
