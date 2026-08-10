const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',      
    database: 'alunos_filmes03MC'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});


app.get('/filmes', (req, res) => {
    const query = 'SELECT * FROM filmes_PietraCavalcanti';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.post('/filmes', (req, res) => {
    const { nome, genero, duracao, classificacao } = req.body;
    const query = 'INSERT INTO filmes_PietraCavalcanti (nome, genero, duracao, classificacao) VALUES (?, ?, ?, ?)';
    
    db.query(query, [nome, genero, duracao, classificacao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome, genero, duracao, classificacao });
    });
});



app.put('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, genero, duracao, classificacao } = req.body;
    const query = 'UPDATE filmes_PietraCavalcanti SET nome = ?, genero = ?, duracao = ?, classificacao = ? WHERE id = ?';

    db.query(query, [nome, genero, duracao, classificacao, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado.' });
        }
        res.json({ id, nome, genero, duracao, classificacao });
    });
});



app.delete('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM filmes_PietraCavalcanti WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Filme não encontrado.' });
        }
        res.json({ message: `Filme com ID ${id} removido com sucesso.` });
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});