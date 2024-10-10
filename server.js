const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/gerenciador-tarefas');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Middleware para JSON
app.use(express.json());

// Importa as rotas de tarefas
const tarefasRouter = require('./routes/tarefas');
app.use('/tarefas', tarefasRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});