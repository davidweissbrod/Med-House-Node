export default class Medicamento{
    idMedicamento;
    nombre;
    marca;
    dosis;
    formaFarm;
    droga;
    idCategoria;
    descripcion;
    stock;

    Farmaceutico(idMed, nom, mar, dos, formFarm, dro, idCat, desc, sto){
        this.idMedicamento = idMed;
        this.nombre = nom;
        this.marca = mar;
        this.dosis = dos;   
        this.formaFarm = formFarm;
        this.droga = dro;
        this.idCategoria = idCat;
        this.descripcion = desc;
        this.stock = sto;
    }
}