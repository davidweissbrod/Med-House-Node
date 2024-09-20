export default class validacion{
    getValidatedString(str){
        let valido = true
        if(str.length < 3 || str === ""){
            return false
        } 
        return valido
    }
    
    emailValidation(email){
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }
    
    getValidatedDni(dni){
        if(dni < 7 || dni > 8){
            return true
        }
        return false
    }

    isValidId(id, collection){
        return collection.find(item => item.id === parseInt(id)) !== undefined;
    }
    
}