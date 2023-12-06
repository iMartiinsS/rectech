const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/rectech', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo Usuario
const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: { type: String, required: true },
    senha: { type: String, required: true }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Modelo NotaFiscal
const notaFiscalSchema = new mongoose.Schema({
    numero: { type: String, required: true },
    dataEmissao: Date,
    item: String,
    valorUnitario: Number,
    quantidade: Number
});
const NotaFiscal = mongoose.model('NotaFiscal', notaFiscalSchema);

// Rota para cadastrar Usuário
app.post('/usuarios', async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.status(201).send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para cadastrar Nota Fiscal
app.post('/notasfiscais', async (req, res) => {
    const notaFiscal = new NotaFiscal(req.body);
    try {
        await notaFiscal.save();
        res.status(201).send(notaFiscal);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Inicializar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
