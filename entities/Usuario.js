export default class Usuario{
    idUsuario;
    dni;
    nombre;
    apellido;
    password;
    email;
    foto_perfil;
    fecha_nacimiento;
    genero;
    telefono;

    Usuario(idUs, dni, nom, ap, con, email, pfp, fn, genero, tel){
        this.idUsuario = idUs;
        this.dni = dni;
        this.nombre = nom;
        this.apellido = ap;
        this.password = con;
        this.email = email; 
        this.foto_perfil = pfp;
        this.fecha_nacimiento = fn;
        this.genero = genero;
        this.telefono = tel;
    }
}