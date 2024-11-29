import express from "express";
import cors from "cors"; 
import FarmRouter from "./controllers/farm_controller.js";
import CategoryRouter from "./controllers/category_controller.js"
import UserRouter from "./controllers/user_controller.js"
import MedsRouter from "./controllers/meds_controller.js"
import BolsaRouter from './controllers/bolsa_controller.js'
import NecesitadosRouter from './controllers/necesitado_controller.js'
import BusquedaRouter from './controllers/busqueda_controller.js'
import RequestRouter from './controllers/request_controller.js'
import PreguntasRouter from './controllers/preguntas_controller.js'
import PedidosRouter from './controllers/pedidos_controller.js'

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routers
app.use('/farmaceutico', FarmRouter);
app.use('/categorias', CategoryRouter);
app.use('/usuario', UserRouter);
app.use('/medicamento', MedsRouter);
app.use('/bolsa', BolsaRouter)
app.use('/necesitados', NecesitadosRouter)
app.use('/busqueda', BusquedaRouter)
app.use('/request', RequestRouter)
app.use('/preguntas', PreguntasRouter)
app.use('/pedidos', PedidosRouter)

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;