const $window = window;
const listadoPersonajes = [
  {
    nombre: "Julia",
    personalidad: "Se enoja facil",
    img: "./imagenes/julia.gif"
  }
];
//Fondo
const $fondi = document.querySelector("#fondi");
$fondi.style.width = "900px";
$fondi.style.height = "500px";
$fondi.style.margin = "30px";
$fondi.style.textAlign = "center";
//recuadro del juego
const $frame = document.querySelector("#frame");
$frame.style.width = "600px";
$frame.style.height = "600px";
$frame.style.backgroundColor = "white";
$frame.style.border = "1px solid black";
$frame.style.backgroundPosition = "center";
//fondo del juego
const $mainE = document.querySelector("#mainE");
$mainE.style.width = "600px";
$mainE.style.height = "600px";
$mainE.style.backgroundSize = "100%";
$mainE.style.backgroundPosition = "center";
//fondo de game over
const $gameOver = document.querySelector("#gameOver");
$gameOver.style.width = "1280px";
$gameOver.style.height = "600px";
$gameOver.style.margin = "30px";
$gameOver.style.backgroundRepeat = "no-repeat";
$gameOver.style.textAlign = "center";
//scoring del personaje
let $score = document.querySelector("#score");
$score.style.fontSize = "30px";
$score.style.color = "white";
$score.puntaje = 0;
//creando personaje
const $barco = document.querySelector("#barquito");
$barco.vida = 1;
$barco.style.width = "50px";
$barco.style.height = "50px";
$barco.style.backgroundSize = "100%";
$barco.style.backgroundPosition = "center";
$barco.style.position = "absolute";
$barco.velocidad = 10;
$barco.x = 250;
$barco.y = 300;
$barco.style.marginLeft = $barco.x + "px";
$barco.style.marginTop = $barco.y + "px";
$mainE.append($barco);
//continuacion de la partida
const $si = document.querySelector("#si");
const $no = document.querySelector("#no");
const $opcSi = document.querySelector("#opcSi");
const $opcNo = document.querySelector("#opcNo");
//Sonido
const personaje = document.createElement("audio");
const gameover = document.createElement("audio");
const explosion = document.createElement("audio");
const musica = document.createElement("audio");
personaje.src = "/sonidos/vozpersonaje.mp3";
gameover.src = "/sonidos/sonidogameover.mp3";
explosion.src = "/sonidos/explosion.wav";
musica.src = "/sonidos/sonido.wav";
//elementos menu
const $divMenu = document.querySelector("#menu");
const $inpStart = document.querySelector("#startMenu");
const $inpOptions = document.querySelector("#optionsMenu");
//elementos opciones
const $divOptions = document.querySelector("#options");
const $inpOptionsVolver = document.querySelector("#optionsVolver");
//elementos select personajes
const $divMain = document.querySelector("#main");
const $MainIniciar = document.querySelector("#mainIniciar");
const $divStartPersonajes = document.querySelector("#startPersonajes");
const $divStartPersonajesInfo = document.querySelector("#startPersonajesInfo");
//muestra al personaje
$inpStart.onclick = function(event) {
  $divMenu.classList.add("hide");
  $divMain.classList.remove("hide");
  let $divListadoPersonajes = "";

  for (let i = 0; i < listadoPersonajes.length; i++) {
    $divListadoPersonajes +=
      "<img " +
      'id="' +
      i +
      '"' +
      'class="img-personaje" src="' +
      listadoPersonajes[i].img +
      '" />';
  }
  $divStartPersonajes.innerHTML = $divListadoPersonajes;

  const $imgListadoPersonajes = document.querySelectorAll(".img-personaje");

  for (let i = 0; i < $imgListadoPersonajes.length; i++) {
    $imgListadoPersonajes[i].onclick = function(event) {
      personaje.play();
      let $infoPersonaje = "";
      const info = listadoPersonajes[this.id];

      $infoPersonaje += "<p>" + info.nombre + "</p>";
      $infoPersonaje += "<p>" + info.personalidad + "</p>";

      $divStartPersonajesInfo.innerHTML = $infoPersonaje;
    };
  }
};
//al pulsar lleva al menu de opciones
$inpOptions.onclick = function(event) {
  $divMenu.classList.add("hide");
  $divOptions.classList.remove("hide");
};
//pone la musica al juego
$opcSi.onclick = function(event) {
  musica.play();
};
//saca la musica del juego
$opcNo.onclick = function(event) {
  musica.pause();
};
//devuelve al menu principal
$inpOptionsVolver.onclick = function(event) {
  $divOptions.classList.add("hide");
  $divMenu.classList.remove("hide");
};
//continua la partida
$si.onclick = function(event) {
  $divMain.classList.remove("hide");
  $mainE.appendChild($barco);
  crearMisil();
  $divMenu.classList.add("hide");
  $fondi.classList.remove("hide");
  $gameOver.classList.add("hide");
};
//lo lleva al menu principal
$no.onclick = function(event) {
  $divMain.classList.add("hide");
  $divMenu.classList.remove("hide");
  $fondi.classList.remove("hide");
  $gameOver.classList.add("hide");
};
//movimiento del personaje
$window.onkeypress = function(event) {
  const keyCode = event.keyCode;
  if (keyCode === 97 && $barco.x > 5) {
    $barco.x -= $barco.velocidad;
    $barco.style.marginLeft = $barco.x + "px";
  } else if (keyCode === 100 && $barco.x < 550) {
    $barco.x += $barco.velocidad;
    $barco.style.marginLeft = $barco.x + "px";
  } else if (keyCode === 119 && $barco.y > 300) {
    $barco.y -= $barco.velocidad;
    $barco.style.marginTop = $barco.y + "px";
  } else if (keyCode === 115 && $barco.y < 540) {
    $barco.y += $barco.velocidad;
    $barco.style.marginTop = $barco.y + "px";
  }
};
//creacion del misil
function crearMisil() {
  const $misil = document.createElement("div");
  $misil.style.width = "50px";
  $misil.style.height = "50px";
  $misil.style.background =
    'url("http://pixelartmaker.com/art/171408bad12fce0.png")';
  $misil.style.backgroundRepeat = "no-repeat";
  $misil.style.backgroundSize = "100%";
  $misil.style.backgroundPosition = "center";
  $misil.style.position = "absolute";
  $misil.x = 0;
  $misil.y = Math.floor(Math.random() * (580 - 300)) + 300;
  $misil.style.marginLeft = $misil.x + "px";
  $misil.style.marginTop = $misil.y + "px";
  $misil.classList.add("misil");
  $mainE.appendChild($misil);
}
//inicia el juego
$MainIniciar.onclick = function(event) {
  $divMain.classList.add("hide");
  $divMenu.classList.add("hide");
  $fondi.classList.add("hide");
  $frame.classList.remove("hide");
  const misilLoop = setInterval(function() {
    crearMisil();
    const $misilLista = document.querySelectorAll(".misil");
    for (let i = 0; i < $misilLista.length; i++) {
      $barco.vida = 1;
      $score.puntaje++;
      $misilLista[i].x += 30;
      $misilLista[i].style.marginLeft = $misilLista[i].x + "px";
      if ($misilLista[i].x > 560) {
        $mainE.removeChild($misilLista[i]);
      }
      if ($misilLista.length) {
        $misilLista.forEach(function(t) {
          if (
            t.x < $barco.x + 50 &&
            t.x + 50 > $barco.x &&
            t.y < $barco.y + 50 &&
            t.y + 50 > $barco.y
          ) {
            $barco.vida = 0;
            $mainE.removeChild($barco);
            $mainE.removeChild(t);
            clearInterval(misilLoop);
          }
        });
      }
    }
  }, 800);
  const gameOver = setInterval(function() {
    if ($barco.vida === 0) {
      $frame.classList.add("hide");
      $gameOver.classList.remove("hide");
      document.getElementById("score").innerHTML = $score.puntaje;
      clearInterval(gameOver);
      gameover.play();
      explosion.play();
      musica.pause();
    }
  }, 50);
};
