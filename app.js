let listaTarefas = [];
let statusAtual = "pendente";

const inputTarefa = document.getElementById("inp-tarefa");
const btnAdd = document.getElementById("btn-add");
const btnEdit = document.getElementById("btn-edit");
const divTarefas = document.getElementById("tarefas");

const btnUncheck = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`;

const btnCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;

btnAdd.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {
  listaTarefas.push({
    id: crypto.randomUUID(),
    tarefa: inputTarefa.value,
    status: "pendente",
  });
  inputTarefa.value = "";
  exibirTarefas(statusAtual);
}

function criarTarefa(task) {
  let tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  tarefa.id = task.id;
  tarefa.innerHTML = `
             <button class="btn-task ${task.status}" onclick="verificarTarefa(this)">
                 ${task.status == "pendente" ? btnUncheck : btnCheck}
             </button>
             <p>${task.tarefa}</p>
             <div class="edicao">
                 <button onclick="editarTarefa(this.parentElement.parentElement.id)">
                     <img src="assets/edit.svg"  />
                 </button>
                 <button onclick="apagarTarefa(this.parentElement.parentElement.id)">
                     <img src="assets/trash.svg"  />
                 </button>
             </div>
             `;

  divTarefas.appendChild(tarefa);
}

function exibirTarefas(status = "todas") {
  if (status == "todas") {
    statusAtual = "todas";
  }
  statusAtual = status;
  divTarefas.innerHTML = "";
  if (status == "todas") {
    listaTarefas.forEach((t) => {
      criarTarefa(t);
    });
  } else {
    listaTarefas.forEach((t) => {
      if (t.status == status) {
        criarTarefa(t);
      }
    });
  }
}

function verificarTarefa(btn) {
  let id = btn.parentElement.id;
  let idx = listaTarefas.findIndex((item) => item.id == id);
  if (statusAtual != "todas") statusAtual = listaTarefas[idx].status;
  let novoStatus = listaTarefas[idx].status == "pendente" ? "concluida" : "pendente";
  listaTarefas[idx].status = novoStatus;
  exibirTarefas(statusAtual);
}

function apagarTarefa(id) {
  let idx = listaTarefas.findIndex((item) => item.id == id);
  let statusAtual = listaTarefas[idx].status;
  listaTarefas.splice(idx, 1);
  exibirTarefas(statusAtual);
}

function editarTarefa(id) {
  let idx = listaTarefas.findIndex((item) => item.id == id);
  inputTarefa.value = listaTarefas[idx].tarefa;
  btnAdd.style.display = "none";
  btnEdit.style.display = "flex";
  btnEdit.setAttribute("onclick", `atualizarTarefa("${id}")`);
}

function atualizarTarefa(id) {
  let idx = listaTarefas.findIndex((item) => item.id == id);
  listaTarefas[idx].tarefa = inputTarefa.value;
  inputTarefa.value = "";
  btnAdd.style.display = "flex";
  btnEdit.style.display = "none";
  exibirTarefas(statusAtual);
}
