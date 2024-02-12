// let listaTarefas = JSON.parse(localStorage.getItem("Tarefas")) ?? [];
// let statusAtual = "pendente";

// const inputTarefa = document.getElementById("inp-tarefa");
// const btnAdd = document.getElementById("btn-add");
// const btnEdit = document.getElementById("btn-edit");
// const divTarefas = document.getElementById("tarefas");

// const btnUncheck = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`;

// const btnCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`;

// btnAdd.addEventListener("click", adicionarTarefa);

// function salvarLista() {
//   localStorage.setItem("Tarefas", JSON.stringify(listaTarefas));
// }

// function adicionarTarefa() {
//   listaTarefas.push({
//     id: crypto.randomUUID(),
//     tarefa: inputTarefa.value,
//     status: "pendente",
//   });
//   inputTarefa.value = "";
//   exibirTarefas(statusAtual);
//   salvarLista();
// }

// function criarTarefa(task) {
//   let tarefa = document.createElement("div");
//   tarefa.classList.add("tarefa");
//   tarefa.id = task.id;
//   tarefa.innerHTML = `
//              <button class="btn-task ${task.status}" onclick="verificarTarefa(this)">
//                  ${task.status == "pendente" ? btnUncheck : btnCheck}
//              </button>
//              <p>${task.tarefa}</p>
//              <div class="edicao">
//                  <button onclick="editarTarefa(this.parentElement.parentElement.id)">
//                      <img src="assets/edit.svg"  />
//                  </button>
//                  <button onclick="apagarTarefa(this.parentElement.parentElement.id)">
//                      <img src="assets/trash.svg"  />
//                  </button>
//              </div>
//              `;

//   divTarefas.appendChild(tarefa);
// }

// function exibirTarefas(status = "todas") {
//   if (status == "todas") {
//     statusAtual = "todas";
//   }
//   statusAtual = status;
//   divTarefas.innerHTML = "";
//   if (status == "todas") {
//     listaTarefas.forEach((t) => {
//       criarTarefa(t);
//     });
//   } else {
//     listaTarefas.forEach((t) => {
//       if (t.status == status) {
//         criarTarefa(t);
//       }
//     });
//   }
// }

// function verificarTarefa(btn) {
//   let id = btn.parentElement.id;
//   let idx = listaTarefas.findIndex((item) => item.id == id);
//   if (statusAtual != "todas") statusAtual = listaTarefas[idx].status;
//   let novoStatus = listaTarefas[idx].status == "pendente" ? "concluida" : "pendente";
//   listaTarefas[idx].status = novoStatus;
//   exibirTarefas(statusAtual);
//   salvarLista();
// }

// function apagarTarefa(id) {
//   let idx = listaTarefas.findIndex((item) => item.id == id);
//   let statusAtual = listaTarefas[idx].status;
//   listaTarefas.splice(idx, 1);
//   salvarLista();
//   exibirTarefas(statusAtual);
// }

// function editarTarefa(id) {
//   let idx = listaTarefas.findIndex((item) => item.id == id);
//   inputTarefa.value = listaTarefas[idx].tarefa;
//   btnAdd.style.display = "none";
//   btnEdit.style.display = "flex";
//   btnEdit.setAttribute("onclick", `atualizarTarefa("${id}")`);
// }

// function atualizarTarefa(id) {
//   let idx = listaTarefas.findIndex((item) => item.id == id);
//   listaTarefas[idx].tarefa = inputTarefa.value;
//   inputTarefa.value = "";
//   btnAdd.style.display = "flex";
//   btnEdit.style.display = "none";
//   salvarLista();
//   exibirTarefas(statusAtual);
// }

let listaDeTags = JSON.parse(localStorage.getItem("LT-Tags")) ?? [];
let listaDeTarefas = JSON.parse(localStorage.getItem("LT-Tasks")) ?? [];
const btnAticionar = document.getElementById("form-btn-adicionar");

function adicionarTag() {
  let nome = document.getElementById("modal-input-nome").value;
  let cor = document.getElementById("modal-input-cor").value;
  listaDeTags.push({
    id: crypto.randomUUID(),
    nomeTag: nome,
    corTag: cor,
  });
  document.getElementById("modal-input-nome").value = "";
  console.log(listaDeTags);
  listarModalTags();
  listarFormTags();
  salvarInformacoes();
}

function listarModalTags() {
  document.getElementById("modal-tag-lista").innerHTML = "";
  listaDeTags.forEach((tag) => {
    let divTag = document.createElement("div");
    divTag.innerHTML = `
    <span style="background-color: ${tag.corTag} ;" >${tag.nomeTag}</span>
    <button onclick="apagarTag('${tag.id}')">
      <img src="assets/x.svg" alt="" />
    </button>
    `;

    document.getElementById("modal-tag-lista").appendChild(divTag);
  });
}

function apagarTag(id) {
  let index = listaDeTags.findIndex((item) => item.id == id);
  listaDeTags.splice(index, 1);
  console.log(listaDeTags);
  salvarInformacoes();
  listarModalTags();
}

function listarFormTags() {
  document.getElementById("form-tags").innerHTML = "";
  listaDeTags.forEach((tag) => {
    let divTag = document.createElement("div");
    divTag.innerHTML = `
    <label for="tag-${tag.nomeTag}" onclick="handleCheck('tag-${tag.nomeTag}', this)" style="background-color: ${tag.corTag};">${tag.nomeTag}</label>
    <input type="checkbox" name="tags" id="tag-${tag.nomeTag}" value="${tag.nomeTag}" />
    `;
    document.getElementById("form-tags").appendChild(divTag);
  });
}

function salvarInformacoes() {
  localStorage.setItem("LT-Tags", JSON.stringify(listaDeTags));
  localStorage.setItem("LT-Tasks", JSON.stringify(listaDeTags));
}

function adicionarTarefa() {
  let tarefa = document.getElementById("form-nomeTarefa").value;
  let tags = checarBox();
  if (tarefa == "") {
    alert("Digite uma descrição");
    return;
  } else {
    listaDeTarefas.push({
      id: crypto.randomUUID(),
      descricao: tarefa,
      tags: tags,
      status: "pendente",
    });
  }
  document.getElementById("form-nomeTarefa").value = "";
}

function checarBox() {
  const tags = document.getElementsByName("tags");
  let tagsSelecionadas = [];
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].checked) {
      tagsSelecionadas.push(tags[i].value);
    }
  }
  return tagsSelecionadas;
}

btnAticionar.addEventListener("click", (e) => {
  e.preventDefault();
  adicionarTarefa();
});

function handleCheck(tag, label) {
  let checkbox = document.getElementById(tag);
  if (!checkbox.checked) {
    label.classList.add("check");
  } else {
    label.classList.remove("check");
  }
}
