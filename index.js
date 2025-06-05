require("dotenv").config(); 

const db = require("./db");

const port = process.env.PORT;

const express = require('express');

const app = express();

app.use(express.json());

app.post("/client", async (req, res) => {
    await db.insertCustomer(req.body);
    res.sendStatus(201);
})
// Rota para excluir cliente
app.delete("/client/:id", async (req, res) => {
    await db.deleteCustomer(req.params.id)
    res.sendStatus(204)
    })
// Rota para listar um cliente específico
app.get('/client/:id', async (req, res) => {
    // Captura o parâmetro 'id' presente na URL, que corresponde ao CPF do cliente
    const cliente = await db.selectCustomer(req.params.id);
    // Responde com os dados do cliente em formato JSON
    res.json(cliente);
    });

app.listen(port);

console.log("Backend Rodando!")