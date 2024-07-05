export default class Farmaceutico{
    idFarmaceutico;
    dni;
    nombre;
    apellido;
    titulo;
    contraseña;
    email;
    genero = null;
    fotoPerfil = null;
    fechaNacimiento = null;
    telefono = null;

    Farmaceutico(idFarm, dni, nom, ap, titulo, con, email, genero, pfp, fn, tel){
        this.idFarmaceutico = idFarm;
        this.dni = dni;
        this.nombre = nom;
        this.apellido = ap;
        this.titulo = titulo;
        this.contraseña = con;
        this.email = email;
        this.genero = genero;
        this.fotoPerfil = pfp;
        this.fechaNacimiento = fn;
        this.telefono = tel;
    }
}