function buscaTodosAnuncios(){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/anuncio",
    beforeSend: function () {
      //Aqui adicionas o loader
      $("#divCorpo").html('' + 
      '<div class="carregando">' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
          '</div>' + 
      '</div>'
      );
    },         
    success: function(data) {
     $("#divCorpo").hide();
     populaTabela(data)
    },
    error: function() {
      $("#divCorpo").hide();
      $('#content-notfound').html('' + 
      '<img src="/images/notFound.jpg">' + 
      '<p>Nenhum carro foi encontrado.</p>'
    );
    }   
  });
}

function buscaTodosClientes(){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/cliente",
    beforeSend: function () {
      //Aqui adicionas o loader
      $("#divCorpo").html('' + 
      '<div class="carregando">' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
          '</div>' + 
      '</div>'
      );
    },         
    success: function(data) {
     $("#divCorpo").hide();
     populaTabelaCliente(data);
    },
    error: function() {
      $("#divCorpo").hide();
      $('#content-notfound').html('' + 
      '<img src="/images/notFound.jpg">' + 
      '<p>Nenhum carro foi encontrado.</p>'
    );
    }   
  });
}

function populaTabela(data){
  var tableBodyData = document.getElementById('tableDataBody');
  for(var i = 0; i < data.length; i++){
    var trTableBodyData = document.createElement('tr');
    
    trTableBodyData.innerHTML = '' + 
      '<tr>' + 
        '<th scope="row">' + data[i].idAnuncio + '</th>' +
        '<td>' + data[i].marca  + '</td>' + 
        '<td>' + data[i].modelo  + '</td>' +
        '<td id="money">' + data[i].preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '</td>' +
        '<td id="editar" onclick="editaData(' + data[i].idAnuncio + ')">' +
          '<img src="/images/adm/edit.png" class="content-editable">' + 
        '</td>' +
        '<td id="excluir" onclick="excluiData('+ data[i].idAnuncio   + ')">' +
            '<img src="/images/adm/delete.png" class="content-editable">' + 
        '</td>' + 
      '</tr>'

        tableBodyData.appendChild(trTableBodyData);
  }
}

function populaTabelaCliente(data){
  var tableBodyData = document.getElementById('tableDataBodyCliente');
  for(var i = 0; i < data.length; i++){
    var trTableBodyData = document.createElement('tr');
    
    trTableBodyData.innerHTML = '' + 
      '<tr>' + 
        '<th scope="row">' + data[i].idCliente + '</th>' +
        '<td>' + data[i].nome  + '</td>' + 
        '<td>' + data[i].email  + '</td>' +
        '<td id="editar" onclick="editaDataCliente(' + data[i].idCliente + ')">' +
          '<img src="/images/adm/edit.png" class="content-editable">' + 
        '</td>' +
        '<td id="excluir" onclick="excluiDataCliente('+ data[i].idCliente   + ')">' +
            '<img src="/images/adm/delete.png" class="content-editable">' + 
        '</td>' + 
      '</tr>'

        tableBodyData.appendChild(trTableBodyData);
  }
}

function editaData(id){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/anuncio/id?param=" + id,
    beforeSend: function () {
      //Aqui adicionas o loader
      $("#divCorpo").html('' + 
      '<div class="carregando">' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
          '</div>' + 
      '</div>'
      );
    },         
    success: function(data) {
     $("#divCorpo").hide();
      criaModalData(data);
      $('.modal').modal('show');
    },
    error: function() {
      $("#divCorpo").hide();
      $('#content-notfound').html('' + 
      '<img src="/images/notFound.jpg">' + 
      '<p>Nenhum carro foi encontrado.</p>'
    );
    }   
  });
}

function excluiData(idAnuncio){
 $.ajax({
    type: "DELETE",
    url: "https://cartinder-backend.herokuapp.com/anuncio/id?idAnuncio=" + idAnuncio,
    success: function(data) {
      alert('Excluido com sucesso.');
      document.location.reload(true);
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }
  })
}

function editaDataCliente(id){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/cliente/" + id,
    beforeSend: function () {
      //Aqui adicionas o loader
      $("#divCorpo").html('' + 
      '<div class="carregando">' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
          '</div>' + 
      '</div>'
      );
    },         
    success: function(data) {
     $("#divCorpo").hide();
      criaModalCliente(data);
      $('.modal').modal('show');
    },
    error: function() {
      $("#divCorpo").hide();
      $('#content-notfound').html('' + 
      '<img src="/images/notFound.jpg">' + 
      '<p>Nenhum carro foi encontrado.</p>'
    );
    }   
  });
}

function excluiDataCliente(idCliente){
 $.ajax({
    type: "DELETE",
    url: "https://cartinder-backend.herokuapp.com/cliente/id?idCliente=" + idCliente,
    success: function(data) {
      alert('Excluido com sucesso.');
      document.location.reload(true);
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }
  })
}


function criaModalData(data){
  console.log(data)
  $('.modal-header').html('<h5 class="modal-title" id="exampleModalLabel">' + 
  'Identificador Anuncio: <strong>' + data.idAnuncio+ '</strong></h5>');
  $('#formModalBody').html('' +
      '<label>Marca</label>' + 
      '<input type="text" class="form-control"  readonly="true" value="' + data.marca + '">' +
      '<label>Modelo</label>' + 
      '<input type="text"  class="form-control" value="' + data.modelo + '">' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Ano</label>' + 
          '<input type="text"  class="form-control" value="' + data.ano + '">' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Quilometragem</label>' + 
          '<input type="text"  class="form-control" value="' + data.quilometragem + '">' + 
        '</div>' +
      '</div>' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Câmbio</label>' + 
          '<input type="text"  class="form-control" value="' + data.cambio + '">' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Potencia do Motor</label>' + 
          '<input type="text"  class="form-control" value="' + data.potenciaMotor + '">' + 
        '</div>' +
      '</div>' + 
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Combustivel</label>' + 
          '<input type="text"  class="form-control" value="' + data.combustivel + '">' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Direção</label>' + 
          '<input type="text"  class="form-control" value="' + data.direcao + '">' + 
        '</div>' +
      '</div>' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Qtd. Porta</label>' + 
          '<input type="text"  class="form-control" value="' + data.portas + '">' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Cor</label>' + 
          '<input type="text"  class="form-control" value="' + data.cor + '">' + 
        '</div>' +
      '</div>' + 
      '<label>Preço</label>' + 
      '<input class="form-control" id="inputPreco" value="' + data.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + '">'
  
  )
}

function criaModalCliente(data){
  $('.modal-header').html('<h5 class="modal-title" id="exampleModalLabel">' + 
  '<strong>Cadastro Cliente </strong></h5>');
  $('#formModalBody').html('' + 
    '<label>Identificador Cliente</label>' + 
    '<input type="number" class="form-control" id="inputIdCliente"  readonly value="' + data.id_cliente + '">' +
    '<label>Nome</label>' + 
    '<input type="text" class="form-control" id="inputNome"  value="' + data.nome + '">' +
    '<label>Email</label>' + 
    '<input type="text" class="form-control" id="inputEmail"  value="' + data.email + '">'
  )
  $('.modal-footer').html('' + 
  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>' +
  '<button type="button" class="btn btn-primary" onclick="atualizaCliente()">Salvar</button>'
  )
}

function cadastroAnuncioModal(){
  $('.modal-header').html('<h5 class="modal-title" id="exampleModalLabel">' + 
  '<strong>Cadastro Anuncio </strong></h5>');
  $('#formModalBody').html('' +
      '<label>Identificador Cliente</label>' + 
      '<input type="number" class="form-control" id="inputCliente">' +
      '<label>Marca</label>' + 
        '<select class="custom-select" id="inputMarca">' + 
          '<option value="BMW">BMW</option>' + 
          '<option value="Ford">Ford</option>' + 
          '<option value="Honda">Honda</option>' +
        '</select>' +  
      '<label>Modelo</label>' + 
      '<input type="text"  class="form-control" id="inputModelo">' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Ano</label>' + 
          '<input type="number"  class="form-control" id="inputAno">' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Quilometragem</label>' + 
          '<input type="number"  class="form-control" id="inputQuilometragem">' + 
        '</div>' +
      '</div>' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Câmbio</label>' + 
          '<select class="custom-select" id="inputCambio">' + 
            '<option value="Automático">Automático</option>' + 
            '<option value="CVT">CVT</option>' + 
            '<option value="Manual">Manual</option>' + 
          '</select>' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Potencia do Motor</label>' + 
          '<input type="text"  class="form-control" id="inputPotenciaMotor" placeholder="0.0">' + 
        '</div>' +
      '</div>' + 
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Combustivel</label>' + 
          '<select class="custom-select" id="inputCombustivel">' + 
            '<option value="Diesel">Diesel</option>' + 
            '<option value="Etanol">Etanol</option>' + 
            '<option value="GNV">GNV</option>' + 
          '</select>' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Direção</label>' + 
          '<select class="custom-select" id="inputDirecao">' + 
            '<option value="Elétrica">Elétrica</option>' + 
            '<option value="Hidráulica">Hidráulica</option>' + 
          '</select>' + 
        '</div>' +
      '</div>' +
      '<div class="row">' + 
        '<div class="col">' + 
          '<label>Qtd. Portas</label>' + 
          '<select class="custom-select" id="inputPortas">' + 
            '<option value="1">1</option>' + 
            '<option value="2">2</option>' + 
            '<option value="3">3</option>' + 
            '<option value="4">4</option>' + 
          '</select>' + 
        '</div>' +
        '<div class="col">' + 
          '<label>Cor</label>' + 
          '<input type="text"  class="form-control" id="inputCor">' + 
        '</div>' +
      '</div>' + 
      '<label>Preço</label>' + 
      '<input class="form-control" id="inputPreco">' + 
      '<div class="input-group mb-3">' +
        '<div class="custom-file">' + 
          '<input type="file" class="custom-file-input" id="inputFoto">' + 
          '<label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>' + 
        '</div>' + 
      '</div>' 
  )
  $('.modal-footer').html('' + 
    '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
    '<button type="button" class="btn btn-primary" onclick="cadastroAnuncio()">Save changes</button>'
  )

  //$('#inputPreco').mask('#.##0,00', {reverse: true});
  $('#inputPotenciaMotor').mask('0.0');
  $('.modal').modal('show');
}


function cadastroModalCliente(){
  $('.modal-header').html('<h5 class="modal-title" id="exampleModalLabel">' + 
  '<strong>Cadastro Cliente </strong></h5>');
  $('#formModalBody').html('' + 
    '<label>Nome</label>' + 
    '<input type="text" class="form-control" id="inputNome">' +
    '<label>Email</label>' + 
    '<input type="text" class="form-control" id="inputEmail">'
  )
  $('.modal-footer').html('' + 
  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>' +
  '<button type="button" class="btn btn-primary" onclick="cadastroCliente()">Cadastrar</button>'
  )
  $('.modal').modal('show');
}

async function cadastroAnuncio(){
  
  var objectAnuncio = {
   id_cliente : document.getElementById('inputCliente').value,
   preco : document.getElementById('inputPreco').value,
   modelo : document.getElementById('inputModelo').value,
   marca : document.getElementById('inputMarca').value,
   ano : document.getElementById('inputAno').value,
   quilometragem : document.getElementById('inputQuilometragem').value,
   potenciaMotor : document.getElementById('inputPotenciaMotor').value,
   combustivel : document.getElementById('inputCombustivel').value,
   cambio : document.getElementById('inputCambio').value,
   direcao : document.getElementById('inputDirecao').value,
   cor : document.getElementById('inputCor').value,
   portas : document.getElementById('inputPortas').value,
   foto: ''
  } 

  //Salvando a foto no Imgur ---------------------------------------------------
  var foto = $("#inputFoto")[0].files;

  var formData = new FormData();

  formData.append('image', foto[0])

 await $.ajax({
    async: true,
    crossDomain: true,
    url: 'https://api.imgur.com/3/image',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + 'ad51e6195e2bbb0bace96a04ea2eea98e5479f04'
    },
    processData: false,
    contentType: false,
    mimeType: 'multipart/form-data',
    data: formData,    
    beforeSend: function () {
      //Aqui adicionas o loader
      $(".modal-body").html('' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
      '</div>'
      );
    },    
    success: function(data) {
        var dadosImgur = JSON.parse(data);
        objectAnuncio.foto  = dadosImgur.data.link;
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }   
  });
  //----------------------------------------------------------------------------

  //Salvando o anuncio ---------------------------------------------------------
  await $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/anuncio",
    data: JSON.stringify(objectAnuncio),
    beforeSend: function () {
      //Aqui adicionas o loader
      $(".modal-body").html('' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
      '</div>'
      );
    },
    success: function(data) {
      alert('Cadastrado com sucesso.');
      document.location.reload(true);
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }
  })
  //----------------------------------------------------------------------------

  console.log(objectAnuncio);
}

function cadastroCliente(){

  var objectCliente = {
    nome: document.getElementById('inputNome').value,
    email: document.getElementById('inputEmail').value
  }

  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/cliente",
    data: JSON.stringify(objectCliente),
    beforeSend: function () {
      //Aqui adicionas o loader
      $(".modal-body").html('' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
      '</div>'
      );
    },
    success: function(data) {
      alert('Cadastrado com sucesso.');
      document.location.reload(true);
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }
  })
}

function atualizaCliente(){

  var objectCliente = {
    idCliente: document.getElementById('inputIdCliente').value,
    nome: document.getElementById('inputNome').value,
    email: document.getElementById('inputEmail').value
  }

  $.ajax({
    type: "PUT",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/cliente",
    data: JSON.stringify(objectCliente),
    beforeSend: function () {
      //Aqui adicionas o loader
      $(".modal-body").html('' + 
         '<div class="text-center">' +
            '<div class="spinner-border text-primary" role="status">' + 
            '</div>' +
             '<h1>Carregando......</h1>' + 
      '</div>'
      );
    },
    success: function(data) {
      alert('Atualizado com sucesso.');
      document.location.reload(true);
    },
    error: function(data) {
      console.log('Erro');
      console.log(data);
    }
  })
}