const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector(".app__form-textarea");
const tarefas = [];
const lista = document.querySelector(".app__section-task-list");

btnAdicionarTarefa.addEventListener('click',() =>{
    formAdicionarTarefa.classList.toggle('hidden')
});

// O código acima está adicionando no botão ao clicar, aparecer a lista de tarefas
formAdicionarTarefa.addEventListener('submit',(evento) =>{
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});






