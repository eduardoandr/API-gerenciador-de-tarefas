const express = require('express');
const router = express.Router();
const Tarefa = require('../models/tarefa');
const Joi = require('joi');

//let tarefas = [];

// Criar Tarefa (POST)
/*router.post('/', (req, res) => {
  const tarefa = req.body;
  tarefas.push(tarefa);
  res.status(201).send('Tarefa adicionada com sucesso!');
});
Dessa forma acima demonstra um post sem integração com DB, vamos adicionar 
uma forma que integre com o mesmo logo abaixo.
*/

const tarefaSchema = Joi.object({
  titulo: Joi.string().min(5).required(),
  descricao: Joi.string().min(10).required(),
  concluida: Joi.boolean().required()
});

router.post('/', async (req, res) =>{
  const { error } = tarefaSchema.validate(req.body);
  if (error) {
    console.log('Erro de Validação:', error.details[0].message);  // Log de erro de validação
    return res.status(400).send(error.details[0].message);
  }

  const tarefa = new Tarefa(req.body);
  try{
    await tarefa.save();
    res.status(201).send('Tarefa adicionada!');
  }catch(error){
    console.error(error);
    res.status(400).send(error);
  }
});

// Ler Todas as Tarefas (GET)
/*router.get('/', (req, res) => {
  res.json(tarefas);
});
Da mesma forma como aconteceu com o post, faremos com o get e sucessivamente, integrando ao DB.
*/
router.get('/', async (req, res) =>{
  try{
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  }catch(error){
    console.error('Aqui deu b.o', error);
    res.status(500).send(error);
  }
});

// Atualizar Tarefa (PUT)
/*router.put('/:id', (req, res) => {
  const { id } = req.params;
  const atualizacao = req.body;
  let tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    Object.assign(tarefa, atualizacao);
    res.send('Tarefa atualizada com sucesso!');
  } else {
    res.status(404).send('Tarefa não encontrada');
  }
});*/
router.put('/:id', async (req, res) =>{
  try{
    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!tarefa){
      return res.status(404).send('Tarefa não encontrada');
    }
    res.status(204).send('Tarefa atualizada');
  }catch(error){
    res.status(400).send(error);
  }
});

// Excluir Tarefa (DELETE)
/*router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tarefas = tarefas.filter(t => t.id !== id);
  res.send('Tarefa excluída com sucesso!');
});*/
router.delete('/:id', async (req, res) =>{
  try{
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if(!tarefa){
      return res.status(404).send('Tarefa não encontrada');
    }
    res.send('Tarefa excluída');
  }catch(error){
    res.status(500).send(error);
  }
});

module.exports = router;