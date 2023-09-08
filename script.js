function clickMenu() {
    if (itens.style.display == 'block') {
        itens.style.display = 'none'
    } else {
        itens.style.display = 'block'
    }
}




const div_data=document.getElementById("div_data")
div_data.innerHTML=new Intl.DateTimeFormat('pt-BR').format(new Date());



const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sServico = document.querySelector('#m-servico')
const sDescricao = document.querySelector('#m-descricao')
const sPreco = document.querySelector('#m-preco')
const sQuantidade = document.querySelector('#m-quantidade')
const sValor = document.querySelector('#m-valor')
const btnSalvar = document.querySelector('#btnSalvar')
const sTotal = document.querySelector('#m-total')

let itens
let id
let total = Number('0').toFixed(2);
let porcentagem = 100
let controleCampo = 1;
let valor = (total * porcentagem) / 100
let res = total - valor


function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.classervico.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sServico.value = itens[index].servico
    sDescricao.value = itens[index].descricao
    sPreco.value = itens[index].spreco
    sQuantidade.value = itens[index].squantidade
    sValor.value = itens[index].sValor
    id = index

  } else {
    sServico.value = ''
    sDescricao.value = ''
    sPreco.value  = ''
    sQuantidade.value = ''
    sValor.value = ''
  }

  
}


function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.servico}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.quantidade}</td>
    <td>R$${item.valor}</td>
    <td class="acao">
      <button onclick="editItem(${index})">✏️<i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})">🗑️<i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sServico.value == '' || sDescricao.value == '' || sPreco.value == ''|| sQuantidade.value == '' || sValor.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].servico = sServico.value
    itens[id].descricao = sDescricao.value
    itens[id].preco = sPreco.value
    itens[id].quantidade = sQuantidade.value
    itens[id].valor = sValor.value
  } else {
    itens.push({'servico': sServico.value, 'descricao': sDescricao.value, 'preco': sPreco.value, 'quantidade': sQuantidade.value, 'valor': sValor})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined 
  total = parseInt(total)+ parseInt(sValor.value);
  sTotal.value = total.toLocaleString ('PT-BR');
  porcentagem = (total / porcentagem) * 100;
}

function adicionarCampo() {
  controleCampo++;
  //console.log(controleCampo);

  document.getElementById('condicoes').insertAdjacentHTML('beforeend', '<div class="condicoes" id="condicoes2'   + controleCampo +  '  <div class="condicoes">&nbsp;&nbsp;&nbsp;<label for="m-percentual"><select id="m-percentual" required><option selected disabled value="">Selecione</option><option>10%</option><option>20%</option><option>30%</option><option>40%</option><option>50%</option><option>60%</option><option>70%</option><option>80%</option><option>90%</option><option>100%</option></select> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<label for="m-descricao2"></label> <input id="m-descricao2" type="text" required />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="m-valor2"></label><input id="m-valor2" type="text" required />&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><button type="button" onclick="adicionarCampo()"> + </button></button>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="' + controleCampo + '" onclick="removerCampo(' + controleCampo + ')"> - <br></button></div><br>');
}

function removerCampo(idCampo) {
  //console.log("Campo remover: " + idCampo);
  document.getElementById('condicoes' + idCampo).remove('beforeend', '<div class="condicoes" id="condicoes2'  + controleCampo + '  <div class="condicoes">&nbsp;&nbsp;&nbsp;<label for="m-percentual"><select id="m-percentual" required><option selected disabled value="">Selecione</option><option>10%</option><option>20%</option><option>30%</option><option>40%</option><option>50%</option><option>60%</option><option>70%</option><option>80%</option><option>90%</option><option>100%</option></select> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<label for="m-descricao2"></label> <input id="m-descricao2" type="text" required />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label for="m-valor2"></label><input id="m-valor2" type="text" required />&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><button type="button" onclick="adicionarCampo()"> + </button></button>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="' + controleCampo + '" onclick="removerCampo(' + controleCampo + ')"> - <br></button></div><br>');
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}






const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


//Tabela 2 




  
