import jwt from 'jsonwebtoken';

export default class AuthMiddleware {

    authMiddleware = async (req,res,next) =>
    {
        let token = req.headers.authorization;
        try
        {
            let noBearer = token.slice(7)
            let payload = await jwt.verify(noBearer,'MedHouse');
            req.user = payload;
            if(payload != null){
                next();
            }
            else{
                return res.status(401).send("Token invalido");
            }
        }catch(e)
        {
            console.log(e);
            return res.status(401).send("Token invalido");
        }
    }
}