export default class Request{
    idRequest;
    idUsuario;
    idFarmaceutico = null;
    idMedicamento;
    estado = null; //En proceso
    descripcion;
    fechaCaducidad;
    fechaApertura = null;
    cantidad = null;
    comentario = null;

    Request(idReq, idUs, idFarm, idMed, estado, desc, fCaducidad, fAp, cant, comentario){
        this.idRequest = idReq;
        this.idUsuario = idUs;
        this.idFarmaceutico = idFarm;
        this.idMedicamento = idMed;
        this.estado = estado;
        this.descripcion = desc;
        this.fechaCaducidad = fCaducidad;
        this.fechaApertura = fAp;
        this.cantidad = cant;
        this.comentario = comentario;
    }

    
}