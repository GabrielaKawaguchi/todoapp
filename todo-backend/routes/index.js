var express = require('express');
var router = express.Router();
const db = require('../dao/todo-db');
const helpers = require('../helpers/functions');

//rota para listar as tarefas cadastradas
router.get('/tarefas/listar',async(req,res)=>{
  try{
    const registros = await db.listar();//uso a função assincrona listar de todo-db.js
    res.status(200).json(registros);
  }catch(erro){
    console.error(erro);
    res.status(500).json({mensagem: "Erro ao listar os registros."});
  }
});

//rota para inserir uma tarefa na collection
router.post('/tarefas/adicionar',async(req,res)=>{
  const tarefa = req.body;
  //validamos titulo e data pois a descrição é opcional
  if(helpers.validaForm(tarefa)){
    try{
      await db.adicionar(tarefa) ? res.status(200).json({mensagem: "Tarefa adicionada com sucesso"}) : res.status(500).json({mensagem : "Erro ao adicionar tarefa."});
    }catch(erro){
      console.error(erro);
      res.status(500).json({mensagem: "Erro ao adicionar tarefa"});
    }
  }else{
    res.status(400).json({mensagem: "Dados incompletos enviados na requisição."});
  }
});

//rota para remover uma tarefa da collection
router.delete('/tarefas/remover/:id',async(req,res)=>{
  const id = req.params.id;
  try{
    await db.remover(id) ? res.status(200).json({mensagem: "Registro excluído com sucesso"}) : res.status(200).json({mensagem: "Registro não encontrado para remoção" });
  }catch(erro){
    console.error(erro);
    res.status(500).json({mensagem: "Erro ao remover o registro."});
  }
});

//rota para listar uma tarefa específica por id
router.get('/tarefas/buscar/:id',async(req,res)=>{
  const id = req.params.id;
  try{
    const tarefa = await db.buscarPorId(id);
    res.status(200).json(tarefa);
  }catch(erro){
    console.error(erro);
    res.status(500).json({mensagem: "Erro ao buscar tarefa."});
  }
});

router.put('/tarefas/editar/:id',async(req,res)=>{
  const id = req.params.id;
  const tarefa = req.body;
  if(helpers.validaForm(tarefa)){
    try{
      await db.editar(id,tarefa) ? res.status(200).json({mensagem: "Tarefa alterada com sucesso"}) : res.status(200).json({mensagem: "Tarefa não alterada ou não encontrada para edição"});
    }catch(erro){
      console.error(erro);
      res.status(500).json({mensagem: "Erro ao alterar tarefa."});
    }
  }else{
    res.status(400).json({mensagem: "Dados incompletos enviados na requisição."});
  }
});
//NUNCA APAGUE ESTA LINHA!!!
module.exports = router;
