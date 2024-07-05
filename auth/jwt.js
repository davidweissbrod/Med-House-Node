import jwt from 'jsonwebtoken'

const options = {
    expiresIn: '7d',
    issuer: 'TLT'
}
const key = "#Secreto"

export default class Token{
    async generateToken(payload){
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }
    
    async decryptToken(token){
        try{
            const payload = await jwt.verify(token, secretKey)
            return payload;
        }
        catch(e){
            console.log(e);
        }
    }
}