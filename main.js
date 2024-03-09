const inputTarefa = document.querySelector(".inputTarefa");
const btnTarefa = document.querySelector(".btn-tarefa");
const tarefas = document.querySelector(".tarefas");

//funcao que apenas cria as li
function criaLi() {
  const li = document.createElement("li"); //criar as LI de tarefas usadas para ver as tarefas
  return li;
}

//se o enter for pressionado chama a funcao de criar tarefa
inputTarefa.addEventListener("keypress", function (e) { 
  if (e.keyCode === 13) { //se a tecla pressionada for ENTER (para enviar com enter tb)
    if (!inputTarefa.value) return; //nao enviar se o input estiver vazio
    criaTarefa(inputTarefa.value); //recebe o valor do input digitado
  }
});

//funcao para limpar os input
function limpaInput() {
  inputTarefa.value = ""; //limpa o input
  inputTarefa.focus(); //da ao input o metodo de focus 
}

//funcao para criar o botao de apagar
function criaBotaoApagar(li) {
  li.innerText += " ";
  const btnApagar = document.createElement("button"); //cria o elemento btn
  btnApagar.innerText = "Apagar"; //seta o texto do botao
  // btnApagar.classList.add('apagar'); //solucao valida tb
  btnApagar.setAttribute("class", "apagar");
  li.appendChild(btnApagar);
}

//funcao para criar as tarefas e colocar na ul/li

function criaTarefa(textoInput) {
  const li = criaLi(); //cria a lista
  li.innerText = textoInput; //imprime o texto do input na li
  tarefas.appendChild(li); //
  limpaInput(); //chamada pra dar clear nos inputs
  criaBotaoApagar(li); //chamada da funcao de criar o botao
  salvarTarefas();
}

btnTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return; //nao enviar se o input estiver vazio
  criaTarefa(inputTarefa.value); //joga o texto para a funcao CriaTarefa
});

document.addEventListener("click", function (e) {
  const el = e.target;
  //verificar se é o botao de apagar q foi clicado

  if (el.classList.contains("apagar")) {
    el.parentElement.remove(); //exclui o pai do elemento q no caso é a LI
    salvarTarefas();
  }
});

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = []; //vetor para armazenar as li

  for (let tarefa of liTarefas) {
    //iterar o vetor
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim(); //tirar o texto do btnApagar com o replace e tirar os espaços com o .trim
    listaDeTarefas.push(tarefaTexto); //jogar o texto dentro da listadetarefas
  }
  //criado uma string do array convertido em JSON
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  //armazenamento "LOCAL" para guardar a string tarefas para acessa-la dps
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  //pegar os items armazenados qd recarregar a pagina
  const tarefas = localStorage.getItem("tarefas"); //pega os valores armazenados
  const listaDeTarefas = JSON.parse(tarefas); //converter os JSON em array dnv

  for (let tarefa of listaDeTarefas) { //itera na tarefa entre a listadeTarefas
    criaTarefa(tarefa); //chama a funcao de criarTraefa
  }
}

adicionaTarefasSalvas();
