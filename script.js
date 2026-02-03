const html = document.querySelector("html");
const focoButton = document.querySelector(".app__card-button--foco");
const curtoButton = document.querySelector(".app__card-button--curto");
const longoButton = document.querySelector(".app__card-button--longo");
const titulo = document.querySelector(".app__title");
const banner = document.querySelector(".app__image");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const startPauseBtspan = document.querySelector("#start-pause span");
const musicaFocoInput = document.querySelector("#alternar-musica");
const audioPlay = new Audio("./sons/play.wav");
const audioPausa = new Audio("./sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");
const iconePlayPause = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");
const MusicaInput = document.getElementById("alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

MusicaInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoButton.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoButton.classList.add("active");
});
curtoButton.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoButton.classList.add("active");
});
longoButton.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoButton.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,
            <br><strong class="app__title-strong">mergulhe no que importa</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada? <br><strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("tempo finalizado");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    startPauseBtspan.textContent = "Começar";
    iconePlayPause.setAttribute("src", "./imagens/play_arrow.png");
    audioPausa.play();
    zerar();
    return;
  }

  audioPlay.play();
  startPauseBtspan.textContent = "Pausar";
  iconePlayPause.setAttribute("src", "./imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
