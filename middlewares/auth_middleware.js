import jwt from 'jsonwebtoken';

export default class AuthMiddleware {

    authMiddleware = async (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Token no proporcionado");
        }
        try {
            // Elimina el prefijo 'Bearer ' del token
            let noBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
            let payload = jwt.verify(noBearer, 'MedHouse');
            console.log(payload)
            req.user = payload; // Añade el payload al objeto `req`
            next(); // Continúa con el siguiente middleware o controlador
        } catch (e) {
            console.log(e);
            return res.status(401).send("Token inválido");
        }
    }
}