import express from "express";

import {
    buscarFilosofos,
    buscarFilosofoPorId,
    cadastrarFilosofo
} from "../service/service.js";

const router = express.Router();

router.get("/filosofos", async (req, res) => {
    try {
        const filosofos = await buscarFilosofos();

        res.json(filosofos);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar filósofos"
        });
    }
});

router.get("/filosofos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const filosofo = await buscarFilosofoPorId(id);

        if (!filosofo) {
            return res.status(404).json({
                erro: "Filósofo não encontrado"
            });
        }

        res.json(filosofo);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar filósofo"
        });
    }
});

router.post("/filosofos", async (req, res) => {
    try {
        const {
            nome,
            foto,
            descricao,
            tipo,
            epoca
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                erro: "O nome do filósofo é obrigatório"
            });
        }

        const filosofo = await cadastrarFilosofo(
            nome,
            foto,
            descricao,
            tipo,
            epoca
        );

        res.status(201).json(filosofo);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao cadastrar filósofo"
        });
    }
});

export default router;