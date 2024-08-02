import express from "express";
import cors from "cors"; 
import FarmRouter from "./controllers/farm_controller.js";
import CategoryRouter from "./controllers/category_controller.js"
import UserRouter from "./controllers/user_controller.js"
import MedsRouter from "./controllers/meds_controller.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Routers
app.use('/Farmaceutico', FarmRouter);
app.use('/Categorias', CategoryRouter);
app.use('/Usuario', UserRouter);
app.use('/Medicamento', MedsRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;