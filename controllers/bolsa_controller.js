import Express from "express";
import BolsaService from '../service/bolsa_service.js'
const router = Express.Router();
const svc = new BolsaService();

router.get('/bolsa', async (req, res) => {
    let response = await svc.getUserBolsa(req.params.idUser)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.put('/bolsa', async (req, res) => {
    let response = await svc.updateBolsa(req.body.med)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

router.delete('/bolsa/:idMed', async (req, res) => {
    let response = await svc.deleteMedBolsa(req.params.idMed)
    if(response != null){
        if(response.success){
            return res.status(200).json(response)
        } else{
            return res.status(400).json(response.message)
        }
    } else{
        return res.status(401).json(response)
    }
})

export default router;
