export default class validacion{
    getValidatedString(str){
        let valido = true
        if(str.length < 3 || str === ""){
            return false
        } 
        return valido
    }
    
    emailValidation(correo){
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(correo);
    }
    
    getValidatedDni(dni){
        if(dni < 7 || dni > 8){
            return false
        }
        return true
    }
    
}