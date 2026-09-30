import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
    res.json({
        mensagem: "API do Filosfrenia funcionando!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});