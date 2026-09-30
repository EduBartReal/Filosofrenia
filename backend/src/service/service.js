import pool from "../db/db.js";

export async function buscarFilosofos() {
    const resultado = await pool.query(
        "SELECT * FROM filosofo ORDER BY id_filosofo"
    );

    return resultado.rows;
}

export async function buscarFilosofoPorId(id) {
    const resultado = await pool.query(
        "SELECT * FROM filosofo WHERE id_filosofo = $1",
        [id]
    );

    return resultado.rows[0];
}

export async function cadastrarFilosofo(nome, foto, descricao, tipo, epoca) {
    const resultado = await pool.query(
        `INSERT INTO filosofo
        (nome, foto, descricao, tipo, epoca)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [nome, foto, descricao, tipo, epoca]
    );

    return resultado.rows[0];
}