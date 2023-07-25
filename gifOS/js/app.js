import Giphy from "./giphy.js";

const imagen = document.querySelector("#resultTend");
const sugeridos = document.querySelector(".resultados");
const result_busqueda = document.querySelector("#result_busqueda");
const txtBuscar = document.querySelector("#txtBuscar");
const btnBuscar = document.querySelector("#btnBuscar");
const FiltroSugerencias = document.querySelector("#filtro");
const btnFiltro = document.querySelector("#btnFiltro");
const botonFiltro = document.getElementsByClassName("filtro_buscar");
const ContentInicio = document.querySelector("#inicio");
const ContentMisGuifos = document.querySelector("#misGuifo");
const ContentCapturar = document.querySelector("#capturar");
const guifos = document.getElementById('guifos');
const guifosStorage = document.getElementById('guifosStorage');
const tarjetaBusqueda = document.getElementById('tarjetaBusqueda');
const contentTema = document.getElementById('contentTema');
const btnCambiarTema = document.getElementById('btnCambiarTema');
const btnCrearGuifos = document.getElementById('btnCrearGuifos');
const anchorGuifos = document.getElementById('guifos');
let temaLocalStorage = localStorage.getItem("temaActual");
let arrayBusquedas = [];
var bandera = false;

(() => {
  txtBuscar.value = "";
  MostrarDB();
})();

//Crear guifos, upload.html
btnCrearGuifos.addEventListener('click', function () {
  window.location.href = './upload.html';
})

document.getElementById('logo').addEventListener('click', function () {
  ContentInicio.style.display = "block";
  ContentMisGuifos.style.display = "none";
})

//Carga desde el local storage
document.addEventListener('DOMContentLoaded', function (e) {
  let temaLocalStorage = localStorage.getItem("temaActual");
  if (temaLocalStorage == 'dia') {
    document.getElementById("estilos").href = "./css/style.css";
    if (e.target.id == "btnTema1") {
      e.target.style.background = 'red';
    }
  } else {
    document.getElementById("estilos").href = "./css/style2.css";
  }
});

//Cambio de tema
contentTema.addEventListener('click', function (e) {
  e.preventDefault();
  const temaElegido = e.target.id;
  switch (temaElegido) {
    case ('btnTema1'):
      document.getElementById("estilos").href = "./css/style.css";
      localStorage.setItem("temaActual", 'dia');
      contentTema.style.visibility = "hidden";
      estiloTemaActual();
      break;
    case ('btnTema2'):
      document.getElementById("estilos").href = "./css/style2.css";
      localStorage.setItem("temaActual", 'noche');
      contentTema.style.visibility = "hidden";
      estiloTemaActual();
      break;
  }
})

//Botonera de cambio
btnCambiarTema.addEventListener('click', function () {
  contentTema.innerHTML = ``;
  var nuevoBtn = document.createElement('button');
  nuevoBtn.className = "btnTema1";
  nuevoBtn.id = "btnTema1";
  nuevoBtn.innerHTML = `Sailor Day`;
  contentTema.appendChild(nuevoBtn);
  var nuevoBtn2 = document.createElement('button');
  nuevoBtn2.className = "btnTema2";
  nuevoBtn2.id = "btnTema2";
  nuevoBtn2.innerHTML = `Sailor Night`;
  contentTema.appendChild(nuevoBtn2);
  contentTema.style.visibility = 'visible';
  estiloTemaActual();
});

function estiloTemaActual() {
  temaLocalStorage = localStorage.getItem("temaActual");
  let tema1 = document.getElementById('btnTema1');
  let tema2 = document.getElementById('btnTema2');
  if (temaLocalStorage == 'dia') {
    tema1.style.background = '#FFF4FD';
    tema1.style.color = '#110038';
    tema1.style.border = '1px solid #CCA6C9';
    tema1.style.boxShadow = 'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  } else {
    tema2.style.background = '#2E32FB';
    tema2.style.color = '#FFFFFF';
    tema1.style.border = '1px solid rgba(51,53,143,0.20)';
    tema1.style.boxShadow = 'inset -1px -1px 0 0 #E6DCE4, inset 1px 1px 0 0 #FFFFFF';
  }
}

//Div oculto
document.body.onclick = function (e) {
  var target = e.target || e.srcElement;
  var estado = contentTema.style.visibility;
  if (e.target.id == 'btnCambiarTema' || e.target.classList[1] == 'fa-caret-down') {
    if (bandera == true) {
      contentTema.style.visibility = "hidden";
      bandera = false;
    } else {
      bandera = true;
    }
  } else {
    if (estado == "visible") {
      do {
        if (contentTema == target) {
          return;
        }
        target = target.parentNode;
      } while (target);
      contentTema.style.visibility = "hidden";
    }
  }

  //Color de texto
  if (e.target.id == 'guifos') {
    anchorGuifos.style.color = '#8A829D';
  } else {
    if (temaLocalStorage == 'dia') {
      anchorGuifos.style.color = '#110038';
    } else {
      anchorGuifos.style.color = '#fff';
    }
  }
};

//Busqueda
btnBuscar.addEventListener("click", function () {
  var valorTxt = txtBuscar.value.toString();
  CrearItem(valorTxt);
  GuardarDB();
  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults().then(result => {

    result_busqueda.innerHTML = ``;
    for (let i of result.data) {
      result_busqueda.innerHTML += `
            <div class="img-tendencia">
                <img src="${i.images.fixed_height.url}" alt="">
                <label id="lblImg">#${i.title}</label>
            </div>
            `;
    }
    document.getElementById('txtBusqueda').style.display = 'block';
  });
  ocultarDiv();
});

//Filtro de botones:Muestra
txtBuscar.addEventListener("keyup", function () {
  FiltroSugerencias.style.visibility = "visible";
  btnBuscar.disabled = false;
  btnBuscar.style.border = "1px solid #110038";
  var valorTxt = txtBuscar.value.toString();
  const resBusqueda = new Giphy(valorTxt);
  resBusqueda.getSearchResults().then(result => {
    FiltroSugerencias.innerHTML = ``;
    let j = 0;
    for (let i of result.data) {
      j++;
      FiltroSugerencias.innerHTML += `
<button id="btnFiltro" name="btnFiltro">${i.title}</button>
       `;
      if (j > 2) {
        break;
      }
    }
  });
});

//funcion extra
document.onkeypress = function (e) {
  var esIE = document.all;
  var esNS = document.layers;
  var tecla = esIE ? event.keyCode : e.which;
  if (tecla == 13) {
    btnBuscar.click();
    txtBuscar.value = "";
  }
};

//Funcion clic div
document.onclick = function (e) {
  var target = e.target || e.srcElement;
  var estado = FiltroSugerencias.style.visibility;
  if (estado == "visible") {
    do {
      if (FiltroSugerencias == target) {
        return;
      }
      target = target.parentNode;
    } while (target);
    FiltroSugerencias.style.visibility = "hidden";
    btnBuscar.disabled = true;
    btnBuscar.style.border = "1px solid #808080";
  }
};

//Proceso de busqueda mejorado
FiltroSugerencias.addEventListener("click", function (e) {
  if (e.target.localName == "button") {
    e.preventDefault();
    txtBuscar.value = e.target.innerHTML;
    btnBuscar.click();
    ocultarDiv();
  }
});

//Oculta div de busqueda
function ocultarDiv() {
  FiltroSugerencias.style.visibility = "hidden";
}

//Sugeridos
sugeridos.addEventListener("click", function (e) {
  if (e.target.localName == "button") {
    btnBuscar.disabled = false;
    e.preventDefault();
    txtBuscar.value = e.target.name;
    btnBuscar.click();
    ocultarDiv();
    window.location.href = '#txtBusqueda';
  }
});

//Guifos navegacion
guifos.addEventListener('click', function () {
  document.getElementById('txtGuifosIndex').style.display = 'block';
  ContentInicio.style.display = "none";
  ContentMisGuifos.style.display = "block";
  guifosStorage.innerHTML = ``;
  for (let i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).indexOf("gif") >= 0) {

      let clave = localStorage.key(i);
      let objGuifos = JSON.parse(localStorage.getItem(clave));
      guifosStorage.innerHTML += `
              <div class="img-tendencia">
                  <img src="${objGuifos.data.images.fixed_height.url}" alt="">
                  <label id="lblImg">#${objGuifos.data.title}</label>
              </div>
              `;
    }
  }

})


//Almacena y muestra en local storage
const CrearItem = (argumento) => {
  let item = {
    valor: argumento
  }
  arrayBusquedas.push(item);
  return item;

}
const GuardarDB = () => {
  localStorage.setItem('busqueda', JSON.stringify(arrayBusquedas));
  MostrarDB();
}

function MostrarDB() {
  tarjetaBusqueda.innerHTML = ``;
  arrayBusquedas = JSON.parse(localStorage.getItem('busqueda'));

  if (arrayBusquedas === null) {
    arrayBusquedas = [];
  } else {
    arrayBusquedas.forEach(indice => {
      var nuevoDiv = document.createElement('div');
      nuevoDiv.className = "resBusquedaStorage";
      nuevoDiv.innerHTML = `#${indice.valor}`;
      tarjetaBusqueda.appendChild(nuevoDiv);

    })
  }
}

//Busqueda con click
document.body.addEventListener("click", function (event) {
  if (event.target.className == "resBusquedaStorage") {
    let busqueda = (event.target.innerHTML).substr(1)
    txtBuscar.value = busqueda;
    const resBusqueda = new Giphy(busqueda);
    resBusqueda.getSearchResults().then(result => {
      result_busqueda.innerHTML = ``;
      for (let i of result.data) {
        result_busqueda.innerHTML += `
                <div class="img-tendencia">
                    <img src="${i.images.fixed_height.url}" alt="">
                    <label id="lblImg">#${i.title}</label>
                </div>
                `;
      }
      document.getElementById('txtBusqueda').style.display = 'block';
    });
    ocultarDiv();
  }
})

//Sugerencias
const sugerencias = new Giphy();
sugerencias.getSuggestions().then(result => {
  sugeridos.innerHTML = ``;

  for (let i of result.data) {
    sugeridos.innerHTML += `
    <div class="content_resultados">
        <div class="titulo">
            <label>#${i.title}</label>
            <button><img src="./img/button3.svg" alt=""></button>
        </div>
        <div class="img-result ">
            <img src="${i.images.fixed_height.url}" alt="">
            <button name="${i.title}" id="verMas">Ver Más...</button>
        </div>
    </div>
    `;
  }
});

//Tendencias
const tendencia = new Giphy();
tendencia.getTrending().then(result => {
  imagen.innerHTML = ``;
  for (let i of result.data) {
    imagen.innerHTML += `
    <div class="img-tendencia">
        <img src="${i.images.fixed_height.url}" alt="">
        <label id="lblImg">#${i.title}</label>
    </div>
    `;
  }
});







