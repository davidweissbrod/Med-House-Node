import { Express } from "express";
import BolsaService from '../service/bolsa_service'
const router = express.Router();
const svc = new BolsaService();

router.get('/bolsa', async (req, res) => {
    let response = await svc.getUserBolsa(idUser)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.put('/bolsa', async (req, res) => {
    let response = await svc.updateBolsa(med)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response)
        }
    } else{
        return res.status(401).json(response)
    }
})

export default router;
