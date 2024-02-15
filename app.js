let listaDeTags = JSON.parse(localStorage.getItem("LT-Tags")) ?? [];
let listaDeTarefas = JSON.parse(localStorage.getItem("LT-Tasks")) ?? [];
const btnAticionar = document.getElementById("form-btn-adicionar");
const sectionTarefas = document.getElementById("tarefas");
let idTarefaAtual = "";
let exibicaoTarefas = [];

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
  listarTarefas(listaDeTarefas);
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

function listarTarefas(lista) {
  document.getElementById("tarefas").innerHTML = "";
  lista.forEach((item) => {
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
  listarTarefas(listaDeTarefas);
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
  listarTarefas(listaDeTarefas);
  salvarInformacoes();
}

function apagarTarefa(id) {
  let index = listaDeTarefas.findIndex((item) => item.id == id);
  listaDeTarefas.splice(index, 1);
  listarTarefas(listaDeTarefas);
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

  listarTarefas(listaDeTarefas);
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
  let status = selectStatus.value;
  let tag = selectTag.value;
  console.log(status, tag);
  if (status == "todas") {
    exibicao = listaDeTarefas;
  } else {
    exibicao = listaDeTarefas.filter((tarefa) => tarefa.status == status);
  }

  if (tag !== "todas") {
    exibicao = exibicao.filter((tarefa) => tarefa.tags.includes(tag));
  }

  listarTarefas(exibicao);
}

function apagarConcluidas() {
  let novaLista = listaDeTarefas.filter((tarefa) => tarefa.status == "pendente");
  listaDeTarefas = novaLista;
  listarTarefas(listaDeTarefas);
  salvarInformacoes();
}

document.getElementById("apagar-concluidas").addEventListener("click", apagarConcluidas);
