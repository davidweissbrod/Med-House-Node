import AuthHelper from "../auth/token.js"

export default class AuthMiddleware {

    RemoveBearerFromHeader = (header) => {
        let ret = header;
        if (header && header.startsWith('Bearer ')){
            ret = header.slice(7);
        }
        return ret;
    }

    AuthMiddleware = async (req, res, next) => {
        let authHeader;
        let payload;
        let ret; 
        authHeader = req.headers.authorization;

        if(!authHeader) {
            ret = res.status(401).send('Es necesario un token')
        }
        else{
            authHeader = this.RemoveBearerFromHeader(authHeader);
            const authHelper = new AuthHelper();
            payload = await authHelper.decryptJWT(authHeader);

            if(payload != null){
                req.user = payload;
                next();
            }
            else{
                ret = res.status(401).send('Token invalido');
            }
        }
        return ret;
    }
}