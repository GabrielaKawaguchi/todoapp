const moment = require('moment');

//testa se o dateString ex "2024-04-04 20:30" é válido
function validaData(dateString){
    return moment(dateString,"YYYY-MM-DD HH:mm", true).isValid();
}

function validaForm(tarefa){
    if(tarefa.titulo !== undefined && tarefa.titulo && tarefa.descricao !== undefined && tarefa.data !== undefined && validaData(tarefa.data)){
        return true;
    }else{
        return false;
    }
}

module.exports = { validaForm }