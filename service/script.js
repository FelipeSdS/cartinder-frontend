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
      else{
          buscaAnuncioPorMarca(paramValue)
          console.log(paramValue);
      }

  }else{
    buscaTodosAnuncios();
    console.log(paramValue);
  }
}

function buscaAnuncioPorId(id){
  var ajax = new XMLHttpRequest();

  ajax.open("GET","https://cartinder-backend.herokuapp.com/anuncio/id?param=" + id);

  ajax.send();

  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 &&  ajax.status == 200){
       
          var dados = JSON.parse(ajax.responseText);
          criaPainelTelaComprar(dados);       
    }
  }
}


function buscaAnuncioPorMarca(marca){
  var ajax = new XMLHttpRequest();

  ajax.open("GET","https://cartinder-backend.herokuapp.com/anuncio/marca?param=" + marca);

  ajax.send();

  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 &&  ajax.status == 200){
          var dados = new Array();
          var dados = JSON.parse(ajax.responseText);

    
        for(var i = 0; i < dados.length; i++){
          console.log(dados[i].modelo);
          console.log(dados[i]);
        }
        criaAnuncioTelaCompra(dados);
    }
  }
}

function buscaTodosAnuncios(){
  var ajax = new XMLHttpRequest();
  //var buscaTodosAnuncios = ${BUSCA_TODOS_ANUNCIOS}
  ajax.open("GET","https://cartinder-backend.herokuapp.com/anuncio");

  ajax.send();

  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 &&  ajax.status == 200){
          var dados = new Array();
          var dados = JSON.parse(ajax.responseText);  
        for(var i = 0; i < dados.length; i++){
          console.log(dados[i].modelo);
          console.log(dados[i]);
        }
        criaAnuncioTelaCompra(dados);
    }
  }
}

function criaAnuncioTelaCompra(data){
  
  var divContent = document.getElementById('card-carro')
  for(var i = 0; i < data.length; i++){

    //Cria Elemento HTML
    var cardCarroMbDark = document.createElement('div');
    var cardCarroRowNoGutters = document.createElement('div');
    var cardCarroColMd4 = document.createElement('div');
    var cardCarroColMd8 = document.createElement('div');
    var cardCarroBody = document.createElement('div');
    var cardCarroImg = document.createElement('img');
    var carro = "carroBMW.jpg";

    //Aplicas o CSS
    cardCarroMbDark.className = "card mb-3 bg-dark";
    cardCarroRowNoGutters.className = "row no-gutters";
    cardCarroColMd4.className = "col-md-4";
    cardCarroColMd8.className = "col-md-8";
    cardCarroBody.className = "card-body";
    cardCarroImg.className = "card-img"


    cardCarroImg.src = "/images/home/"+carro;
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
    
    enviarEmailContatoAPI(JSON.stringify(objectEmail));
    
  }

  function enviarEmailContatoAPI(data){
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "https://cartinder-backend.herokuapp.com/contato/duvidaSugestao",
      data: data,
    })
}

