function chamaTelaComprarFiltro(paramValue){
  window.location = "comprarFiltro.html?param="+paramValue;
}

function queryString(parameter) {  
  var loc = location.search.substring(1, location.search.length);   
  var param_value = false;   
  var params = loc.split("&");   
  for (i=0; i<params.length;i++) {   
      param_name = params[i].substring(0,params[i].indexOf('='));   
      if (param_name == parameter) {                                          
          param_value = params[i].substring(params[i].indexOf('=')+1)   
      }   
  }   
  if (param_value) {   
      return param_value;   
  }   
  else {   
      return undefined;   
  }   
}

function verificaParam(){
  var paramValue = queryString('param');
  if(paramValue != null && paramValue != ""){

      if(paramValue > 0){
          buscaAnuncioPorId(paramValue);
          console.log(paramValue);
      }
      else if(paramValue == "all"){
          buscaTodosAnuncios();
          console.log(paramValue);
      }
      /*else if(paramValue == "filtro"){
        buscaAnunciosFiltros();
        console.log(paramValue);
      }*/
      else{
        buscaAnuncioPorMarca(paramValue);
        console.log(paramValue);
      }
  }
}

function buscaAnuncioPorId(id){
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
      criaPainelTelaComprar(data);
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


function buscaAnuncioPorMarca(marca){
  $.ajax({
    type: "GET",
    contentType: "application/json",
    url: "https://cartinder-backend.herokuapp.com/anuncio/marca?param=" + marca,
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
      criaAnuncioTelaCompra(data);
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
      criaAnuncioTelaCompra(data);
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

function buscaAnunciosFiltros(){
  var filtros = {
    marca : document.getElementById('inputSelectMarca').value,
    ano: document.getElementById('inputSelectAno').value
  }
  console.log(filtros)
  $.ajax({
    type: "POST",
    contentType: "application/json",
    url: "http://localhost:8080/anuncio/filtros",
    data: JSON.stringify(filtros),
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
      criaAnuncioTelaCompra(data);
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

function criaAnuncioTelaCompra(data){
  
  var divContent = document.getElementById('card-carro')
  var selectAno = document.getElementById('inputSelectAno');

  var ano = 1990
  for(var i = 0; i < 33; i++){
      var optionSelectAno =document.createElement('option');
      optionSelectAno.value = ano + i;
      optionSelectAno.text = ano + i;
      selectAno.add( optionSelectAno, selectAno.options[i]);
  }

  for(var i = 0; i < data.length; i++){

    //Cria Elemento HTML
    var cardCarroMbDark = document.createElement('div');
    var cardCarroRowNoGutters = document.createElement('div');
    var cardCarroColMd4 = document.createElement('div');
    var cardCarroColMd8 = document.createElement('div');
    var cardCarroBody = document.createElement('div');
    var cardCarroImg = document.createElement('img');
    var cardCarroFoto = data[i].foto;

    //Aplicas o CSS
    cardCarroMbDark.className = "card mb-3 bg-dark";
    cardCarroRowNoGutters.className = "row no-gutters";
    cardCarroColMd4.className = "col-md-4";
    cardCarroColMd8.className = "col-md-8";
    cardCarroBody.className = "card-body";
    cardCarroImg.className = "card-img";

    console.log(cardCarroFoto);
    cardCarroImg.src = cardCarroFoto;
    cardCarroBody.innerHTML = '<h5 class="card-title">' + data[i].modelo +  '</h5>' +
    '<p class="cardt-text"><strong>Ano:</strong> ' + data[i].ano + '</p>' +
    '<p class="cardt-text"><strong>Quilometragem:</strong> ' + data[i].quilometragem + 'km</p>' +
    '</br>' +
    '<a class="card-link" href="comprar.html?param=' + data[i].idAnuncio + '">Detalhes</a>'

    //vincular nos aos elementos
    cardCarroColMd8.appendChild(cardCarroBody);
    cardCarroColMd4.appendChild(cardCarroImg);
    cardCarroRowNoGutters.appendChild(cardCarroColMd4);
    cardCarroRowNoGutters.appendChild(cardCarroColMd8);
    cardCarroMbDark.appendChild(cardCarroRowNoGutters);

    divContent.appendChild(cardCarroMbDark);

  }
}

function criaPainelTelaComprar(data){
  var divPanelCar = document.getElementById('panel-car');
  divPanelCar.innerHTML = ' '+ 
  //Marca
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
     ' <img src="/images/comprar/tag.png"> ' +
     ' <strong>Marca</strong> ' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.marca +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Modelo
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/keycar.png"> ' +
      '<strong>Modelo</strong> ' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.modelo +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Ano
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/calendar.png"> ' +
      '<strong>Ano</strong> ' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.ano +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Quilometragem 
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/road.png"> ' +
      '<strong style="font-size: 13px; padding-left: 3px;">Quilometragem</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.quilometragem +'km</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Potencia Motor 
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/potencia.png"> ' +
      '<strong>Potência</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.potenciaMotor +'</strong> ' +
    '</div> ' + 
  '</div> ' + 
  //Combustivel
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/fuel.png"> ' +
      '<strong style="padding-left: 5px;">Combustivel</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.combustivel +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Cambio
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/exchange.png"> ' +
      '<strong>Câmbio</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.cambio +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Direção
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img style="width: 40px; height: 40px;" src="/images/comprar/volante.png">' +
      '<strong>Direção</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.direcao +'</strong> ' +
    '</div> ' + 
  '</div> ' +  
  //Cor
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/color.png">' +
      '<strong>Cor</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.cor +'</strong> ' +
    '</div> ' + 
  '</div> ' +
  //Portas
  '<div class="panel-car-topic">' + 
    '<div class="panel-car-topic-header"> ' + 
      '<img src="/images/comprar/porta.png">' +
      '<strong>Portas</strong>' + 
    '</div> ' + 
    '<div class="panel-car-topic-content"> ' +
      '<strong> ' + data.portas +'</strong> ' +
    '</div> ' + 
  '</div> '  
}

function enviaEmailContato(){

    var objectEmail = {
      nome : nome = document.getElementById('inputNome').value,
      duvidaEmail : duvidaEmail = document.getElementById('inputEmail').value,
      telefone : telefone = document.getElementById('inputTelefone').value,
      mensagem : mensagem = document.getElementById('inputMensagem').value,
    }

    if(validaCamposEmailContato(objectEmail) == true){
      enviarEmailContatoAPI(JSON.stringify(objectEmail));
    }   
}

function validaCamposEmailContato(data){
  var inputNome = document.getElementById('inputNome');
  var inputEmail = document.getElementById('inputEmail');
  var inputTelefone = document.getElementById('inputTelefone');

  if(data.nome == null || data.nome == ""){
    alert("Preencha o campo com seu Nome.");
    inputNome.className = "form-control is-invalid";
    return false;
  }
  else{
    inputNome.className = "form-control is-valid";
  }
  if(data.duvidaEmail == null || data.duvidaEmail == ""){
    alert("Preencha o campo com seu Email.");
    inputEmail.className = "form-control is-invalid";
    return false;
  }else{
    inputEmail.className = "form-control is-valid";
  }
  if(data.telefone == null || data.telefone == "" || data.telefone == "(00) 00000-0000"){
    alert("Preencha o campo com seu Telefone.");
    inputTelefone.className = "form-control is-invalid";
    return false;
  }else{
    inputTelefone.className = "form-control is-valid";
  }

  return true;
}

  function enviarEmailContatoAPI(data){
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "https://cartinder-backend.herokuapp.com/contato/duvidaSugestao",
      data: data,
      beforeSend: function () {
        //Aqui adicionas o loader
        $("#divCorpo").html('' + 
        '<div class="carregando">' + 
           '<div class="text-center">' +
              '<div class="spinner-border text-primary" role="status">' + 
              '</div>' +
               '<h1>Enviando......</h1>' + 
            '</div>' + 
        '</div>'
        );
      },         
      success: function() {
        $("#divCorpo").hide();
        $('.modal-header').html('<h5 class="modal-title">Email enviado com sucesso.</h5>')
        $('.modal-body').html('<p>Você recebera um email de confirmação.</p>')
        $('.modal').modal('show');
      },
      error: function() {
        $("#divCorpo").hide();
        $('.modal-header').html('<h5 class="modal-title">Erro ao enviar o email.</h5>')
        $('.modal-body').html('<p>Por favor contante a nossa equipe diretamente.</p>' + 
                              '<p style="font-weight: bold;">Email: equipecartinder@gmail.com</p>')
        $('.modal').modal('show');
      }   
    });
}


