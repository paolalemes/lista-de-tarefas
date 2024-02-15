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
const sectionTarefas = document.getElementById("tarefas");
let idTarefaAtual = "";

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
  listarSelectTag();
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
  listarSelectTag();
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
  localStorage.setItem("LT-Tasks", JSON.stringify(listaDeTarefas));
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
  listarTarefas();
  salvarInformacoes();
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

function listarTarefas() {
  document.getElementById("tarefas").innerHTML = "";
  listaDeTarefas.forEach((item) => {
    let divTags = "";
    item.tags.forEach((tag) => {
      divTags += `<small>${tag}</small>`;
    });

    let divTarefa = document.createElement("div");
    divTarefa.classList.add("section_tarefas_tarefa");
    divTarefa.innerHTML = `
      <div class="section_tarefas_tarefa">
        <div class="tarefa_descrição">
          <span>${item.descricao}</span>
          <button onclick="checarTarefa('${item.id}')">
            <img src="assets/${item.status == "pendente" ? "square.svg" : "check-square.svg"}" alt="" />
          </button>

          <button type="button"  data-bs-toggle="modal" data-bs-target="#modalEditarTarefa" onclick="editarTarefa('${
            item.id
          }')">
            <img src="assets/edit.svg" alt="" />
          </button>

          <button onclick="apagarTarefa('${item.id}')">
            <img src="assets/trash.svg" alt="" />
          </button>
        </div>
        <div class="tarefa_tags">
          ${divTags}
        </div>
      </div>
      
      `;
    document.getElementById("tarefas").appendChild(divTarefa);
  });
}

function carregarInfos() {
  listarFormTags();
  listarTarefas();
  listarSelectTag();
}

function checarTarefa(id) {
  let index = listaDeTarefas.findIndex((item) => item.id == id);
  let statusTarefa = listaDeTarefas[index].status;
  if (statusTarefa == "pendente") {
    listaDeTarefas[index].status = "concluido";
  } else {
    listaDeTarefas[index].status = "pendente";
  }
  listarTarefas();
  salvarInformacoes();
}

function apagarTarefa(id) {
  let index = listaDeTarefas.findIndex((item) => item.id == id);
  listaDeTarefas.splice(index, 1);
  listarTarefas();
}

function editarTarefa(id) {
  document.getElementById("div-edit-tag").innerHTML = "";
  let index = listaDeTarefas.findIndex((item) => item.id == id);
  document.getElementById("inp-edit-task").value = listaDeTarefas[index].descricao;
  idTarefaAtual = listaDeTarefas[index].id;
  listaDeTags.forEach((tag) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <label for="edit-${tag.nomeTag}" style="background-color: ${tag.corTag};" onclick="handleCheck('edit-${tag.nomeTag}', this)">${tag.nomeTag}</label>
    <input type="checkbox" name="edit-tags" id="edit-${tag.nomeTag}" value="${tag.nomeTag}" />
    `;
    document.getElementById("div-edit-tag").appendChild(div);
  });
}

function handleCheck(tag, label) {
  let checkbox = document.getElementById(tag);
  if (!checkbox.checked) {
    label.classList.add("check");
  } else {
    label.classList.remove("check");
  }
}

function atualizarTarefa() {
  let index = listaDeTarefas.findIndex((item) => item.id == idTarefaAtual);
  let novaDescricao = document.getElementById("inp-edit-task").value;
  let novasTags = [];
  document.getElementsByName("edit-tags").forEach((tag) => {
    if (tag.checked) {
      novasTags.push(tag.value);
    }
  });

  listaDeTarefas[index].descricao = novaDescricao;
  listaDeTarefas[index].tags = novasTags;

  listarTarefas();
  document.getElementById("close-modal").click();
}

function listarSelectTag() {
  let select = document.getElementById("select-tag");
  select.innerHTML = '<option value="todas">Todas</option>';
  listaDeTags.forEach((tag) => {
    let option = document.createElement("option");
    option.setAttribute("value", tag.nomeTag);
    option.innerHTML = tag.nomeTag;
    select.appendChild(option);
  });
}

const selectStatus = document.getElementById("select-status");
const selectTag = document.getElementById("select-tag");

selectStatus.addEventListener("change", filtrarTarefas);

selectTag.addEventListener("change", filtrarTarefas);

function filtrarTarefas() {
  let exibicao;
  let status = selectStatus.value;
  let tag = selectTag.value;
  console.log(status, tag);
  if (status == "todas") {
    exibicao = listaDeTarefas;
  } else {
    exibicao = listaDeTarefas.filter((tarefa) => tarefa.status == status);
  }

  if (tag !== "todas") {
    exibicao == exibicao.filter((tarefa) => tarefa.tags.includes(tag));
  }

  console.log(exibicao);
}
