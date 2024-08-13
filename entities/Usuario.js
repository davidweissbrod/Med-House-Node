export default class Usuario{
    idUsuario;
    dni;
    nombre;
    apellido;
    password;
    email;
    fotoPerfil;
    fechaNacimiento;
    genero;
    telefono;

    Usuario(idUs, dni, nom, ap, con, email, pfp, fn, genero, tel){
        this.idUsuario = idUs;
        this.dni = dni;
        this.nombre = nom;
        this.apellido = ap;
        this.contraseña = con;
        this.email = email; 
        this.fotoPerfil = pfp;
        this.fechaNacimiento = fn;
        this.genero = genero;
        this.telefono = tel;
    }
}