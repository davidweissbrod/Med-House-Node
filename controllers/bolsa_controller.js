import { Express } from "express";
import BolsaService from '../service/bolsa_service'
const router = express.Router();
const svc = new BolsaService();

router.get('/bolsa', async, (req, res) => {
    let response = await 
})