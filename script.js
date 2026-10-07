(function () {
  "use strict";

  var CONFIG = window.CONFIG || {};
  var fotos = [];
  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var telaInicial = document.getElementById("tela-inicial");
  var telaFotos = document.getElementById("tela-fotos");
  var pergunta = document.getElementById("pergunta");
  var btnSim = document.getElementById("btn-sim");
  var btnNao = document.getElementById("btn-nao");
  var trilho = document.getElementById("trilho");
  var mensagemFinal = document.getElementById("mensagem-final");
  var audio = document.getElementById("musica");
  var btnMusica = document.getElementById("btn-musica");
  var btnAnterior = document.getElementById("btn-anterior");
  var btnProxima = document.getElementById("btn-proxima");

  // ---------- Corações flutuantes ----------
  var EMOJIS = ["💗", "💖", "💕", "🩷", "❤️", "💞"];

  function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
  }

  function criarCoracoes() {
    var camada = document.getElementById("coracoes");
    var quantidade = window.innerWidth < 768 ? 14 : 24;

    for (var i = 0; i < quantidade; i++) {
      var c = document.createElement("span");
      var esquerda = aleatorio(0, 96);
      var duracao = aleatorio(9, 18);
      // Corações perto do centro ficam mais transparentes para não atrapalhar a leitura
      var noCentro = esquerda > 28 && esquerda < 68;

      c.className = "coracao";
      c.textContent = EMOJIS[i % EMOJIS.length];
      c.style.left = esquerda + "%";
      c.style.fontSize = aleatorio(14, 38).toFixed(0) + "px";
      c.style.animationDuration = duracao.toFixed(1) + "s";
      c.style.animationDelay = (-aleatorio(0, duracao)).toFixed(1) + "s";
      c.style.setProperty("--deriva", aleatorio(-40, 40).toFixed(0) + "px");
      c.style.setProperty("--opacidade", noCentro ? "0.35" : "0.75");
      camada.appendChild(c);
    }
  }

  // ---------- Descoberta das fotos ----------
  // Sites estáticos não conseguem listar uma pasta, então a página testa os nomes
  // foto01, foto02, ... na pasta "fotos" e usa apenas os arquivos que existirem.
  var PASTA_FOTOS = "fotos/";
  var EXTENSOES = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
  var LOTE = 10; // números testados em paralelo

  // Pergunta ao servidor (sem cache) se o arquivo existe. Ao abrir o index.html
  // direto do computador (file://) o fetch não funciona, então testa carregando a imagem.
  function existeArquivo(src) {
    if (location.protocol === "file:" || !window.fetch) return carregaImagem(src);
    return fetch(src, { method: "HEAD", cache: "no-store" })
      .then(function (r) { return r.ok; })
      .catch(function () { return carregaImagem(src); });
  }

  function carregaImagem(src) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = src;
    });
  }

  function encontrarFoto(numero) {
    var base = PASTA_FOTOS + "foto" + (numero < 10 ? "0" : "") + numero + ".";
    var i = 0;
    function proxima() {
      if (i >= EXTENSOES.length) return Promise.resolve(null);
      var src = base + EXTENSOES[i++];
      return existeArquivo(src).then(function (ok) { return ok ? src : proxima(); });
    }
    return proxima();
  }

  function descobrirFotos() {
    var encontradas = [];
    function testarLote(inicio) {
      var buscas = [];
      for (var n = inicio; n < inicio + LOTE; n++) buscas.push(encontrarFoto(n));
      return Promise.all(buscas).then(function (resultado) {
        var achou = false;
        resultado.forEach(function (src) {
          if (src) { encontradas.push(src); achou = true; }
        });
        // continua enquanto o lote tiver alguma foto (permite buracos na numeração)
        return achou && inicio + LOTE <= 99 ? testarLote(inicio + LOTE) : encontradas;
      });
    }
    return testarLote(1);
  }

  var fotosProntas = descobrirFotos().then(function (lista) {
    fotos = lista;
  });

  // ---------- Pergunta ----------
  var perguntaRespondida = false;

  function mostrarPergunta() {
    if (perguntaRespondida) return;
    pergunta.hidden = false;
    // força o navegador a aplicar o estado inicial antes da transição
    void pergunta.offsetWidth;
    pergunta.classList.add("visivel");
  }

  function esconderPergunta(callback) {
    perguntaRespondida = true;
    pergunta.classList.remove("visivel");
    setTimeout(function () {
      pergunta.hidden = true;
      if (callback) callback();
    }, 700);
  }

  btnNao.addEventListener("click", function () {
    esconderPergunta();
  });

  btnSim.addEventListener("click", function () {
    iniciarMusica(); // precisa acontecer dentro do clique (regra dos navegadores)
    esconderPergunta(function () {
      telaInicial.classList.add("saindo");
      setTimeout(function () {
        telaInicial.hidden = true;
        telaFotos.classList.add("entrando");
        telaFotos.hidden = false;
        void telaFotos.offsetWidth;
        telaFotos.classList.remove("entrando");
        fotosProntas.then(iniciarCarrossel);
      }, 900);
    });
  });

  // ---------- Mensagem final ----------
  function montarMensagem() {
    var linhas = CONFIG.mensagemFinal || [];
    mensagemFinal.textContent = "";
    linhas.forEach(function (linha, i) {
      var el = document.createElement("span");
      el.textContent = linha;
      if (i === 0) el.className = "destaque";
      mensagemFinal.appendChild(el);
    });
  }

  // ---------- Carrossel ----------
  // Na página ficam só as fotos visíveis + 1. A cada passo o trilho desliza uma
  // posição e, ao terminar, a foto que saiu é trocada pela próxima da fila.
  var porVez = 0;
  var primeira = 0;     // índice (em "fotos") da primeira foto visível
  var slides = [];      // um elemento por foto, reaproveitado
  var timer = null;
  var animando = false;
  var aoTerminar = null;
  var segurancaTransicao = null;
  var DURACAO_TRANSICAO = 1100;

  function lerPorVez() {
    var valor = getComputedStyle(document.documentElement).getPropertyValue("--por-vez");
    return parseInt(valor, 10) || 1;
  }

  function criarFoto(src) {
    var div = document.createElement("div");
    div.className = "foto";
    // a animação de entrada roda só uma vez; depois a foto pode ser movida sem repetir
    div.addEventListener("animationend", function () {
      div.classList.add("entrou");
    });
    var img = document.createElement("img");
    img.src = src;
    img.alt = "";
    if (img.decode) img.decode().catch(function () {});
    div.appendChild(img);
    return div;
  }

  function moverPara(posicao, comTransicao) {
    trilho.style.transition = comTransicao
      ? "transform " + DURACAO_TRANSICAO + "ms cubic-bezier(.45, .05, .25, 1)"
      : "none";
    trilho.style.transform = "translateX(" + (-posicao * 100 / porVez) + "%)";
  }

  function slide(deslocamento) {
    var n = fotos.length;
    return slides[((primeira + deslocamento) % n + n) % n];
  }

  function montarCarrossel() {
    pararCarrossel();
    porVez = lerPorVez();
    primeira = 0;
    animando = false;
    trilho.innerHTML = "";
    moverPara(0, false);

    if (slides.length !== fotos.length) slides = fotos.map(criarFoto);

    document.querySelector(".carrossel-area").hidden = fotos.length === 0;
    var precisaGirar = fotos.length > porVez;
    trilho.classList.toggle("estatico", !precisaGirar);
    btnAnterior.hidden = btnProxima.hidden = !precisaGirar;

    var visiveis = precisaGirar ? porVez + 1 : fotos.length;
    for (var i = 0; i < visiveis; i++) {
      var s = slide(i);
      if (!s.classList.contains("entrou")) s.style.animationDelay = Math.min(i, porVez) * 0.18 + "s";
      trilho.appendChild(s);
    }
    if (precisaGirar) retomarCarrossel();
  }

  function animar(posicaoFinal, depois) {
    animando = true;
    aoTerminar = depois;
    moverPara(posicaoFinal, !reduzirMovimento);
    // garante a finalização mesmo se o evento "transitionend" não disparar
    clearTimeout(segurancaTransicao);
    segurancaTransicao = setTimeout(finalizarTransicao, reduzirMovimento ? 0 : DURACAO_TRANSICAO + 150);
  }

  function finalizarTransicao() {
    clearTimeout(segurancaTransicao);
    if (!animando) return;
    animando = false;
    var depois = aoTerminar;
    aoTerminar = null;
    if (depois) depois();
  }

  function avancar() {
    if (animando || fotos.length <= porVez) return;
    animar(1, function () {
      // a primeira foto saiu pela esquerda: vai para o fim com a próxima da fila
      trilho.removeChild(trilho.firstElementChild);
      primeira = (primeira + 1) % fotos.length;
      trilho.appendChild(slide(porVez));
      moverPara(0, false);
    });
  }

  function voltar() {
    if (animando || fotos.length <= porVez) return;
    // coloca a foto anterior à esquerda (fora da tela) e desliza para mostrá-la
    trilho.removeChild(trilho.lastElementChild);
    primeira = (primeira - 1 + fotos.length) % fotos.length;
    trilho.insertBefore(slide(0), trilho.firstElementChild);
    moverPara(1, false);
    void trilho.offsetWidth;
    animar(0, null);
  }

  trilho.addEventListener("transitionend", function (e) {
    if (e.target === trilho) finalizarTransicao();
  });

  // Navegação manual: reinicia o tempo da troca automática a cada clique
  function navegarManual(direcao) {
    if (fotos.length <= porVez) return;
    pararCarrossel();
    if (direcao > 0) avancar();
    else voltar();
    retomarCarrossel();
  }

  btnProxima.addEventListener("click", function () { navegarManual(1); });
  btnAnterior.addEventListener("click", function () { navegarManual(-1); });

  document.addEventListener("keydown", function (e) {
    if (!carrosselIniciado) return;
    if (e.key === "ArrowRight") navegarManual(1);
    else if (e.key === "ArrowLeft") navegarManual(-1);
  });

  // Deslizar com o dedo no celular
  var toqueInicioX = null;
  var toqueInicioY = null;
  trilho.addEventListener("touchstart", function (e) {
    toqueInicioX = e.touches[0].clientX;
    toqueInicioY = e.touches[0].clientY;
  }, { passive: true });
  trilho.addEventListener("touchend", function (e) {
    if (toqueInicioX === null) return;
    var dx = e.changedTouches[0].clientX - toqueInicioX;
    var dy = e.changedTouches[0].clientY - toqueInicioY;
    toqueInicioX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) navegarManual(dx < 0 ? 1 : -1);
  });

  function pararCarrossel() {
    clearInterval(timer);
    timer = null;
  }

  function retomarCarrossel() {
    if (timer || fotos.length <= porVez || telaFotos.hidden) return;
    var intervalo = (CONFIG.segundosPorFoto || 3) * 1000 + 1100;
    timer = setInterval(avancar, intervalo);
  }

  var carrosselIniciado = false;

  function iniciarCarrossel() {
    carrosselIniciado = true;
    montarCarrossel();
  }

  var aguardandoResize = null;
  window.addEventListener("resize", function () {
    if (!carrosselIniciado) return;
    clearTimeout(aguardandoResize);
    aguardandoResize = setTimeout(function () {
      if (lerPorVez() !== porVez) montarCarrossel();
    }, 200);
  });

  document.addEventListener("visibilitychange", function () {
    if (!carrosselIniciado) return;
    if (document.hidden) pararCarrossel();
    else retomarCarrossel();
  });

  // ---------- Música ----------
  function atualizarBotaoMusica() {
    var tocando = !audio.paused;
    btnMusica.classList.toggle("tocando", tocando);
    btnMusica.textContent = tocando ? "🎵" : "🔇";
    btnMusica.setAttribute("aria-label", tocando ? "Pausar música" : "Tocar música");
  }

  function esconderMusica() {
    btnMusica.hidden = true;
  }

  // Baixa a música enquanto a tela inicial está aberta. Tocando a partir da cópia
  // baixada, o navegador sempre consegue pular para o trecho escolhido,
  // independentemente do servidor onde a página estiver hospedada.
  function prepararMusica() {
    if (!CONFIG.musica || location.protocol === "file:" || !window.fetch || !window.URL) return;
    fetch(CONFIG.musica)
      .then(function (r) {
        if (!r.ok) throw new Error("música não encontrada");
        return r.blob();
      })
      .then(function (blob) {
        if (!audio.getAttribute("src")) audio.src = URL.createObjectURL(blob);
      })
      .catch(function () {});
  }

  function iniciarMusica() {
    if (!CONFIG.musica) return;
    // se o download ainda não terminou, toca direto do arquivo
    if (!audio.getAttribute("src")) audio.src = CONFIG.musica + (musicaInicio ? "#t=" + musicaInicio : "");
    var promessa = audio.play();
    btnMusica.hidden = false;
    atualizarBotaoMusica();
    if (promessa && promessa.catch) {
      promessa.then(atualizarBotaoMusica).catch(atualizarBotaoMusica);
    }
  }

  // Trecho em loop: começa em musicaInicio e, ao chegar em musicaFim, volta para o início do trecho
  var musicaInicio = CONFIG.musicaInicio || 0;
  var musicaFim = CONFIG.musicaFim || 0;

  audio.addEventListener("loadedmetadata", function () {
    if (audio.currentTime < musicaInicio) audio.currentTime = musicaInicio;
  });

  audio.addEventListener("timeupdate", function () {
    if (musicaFim && audio.currentTime >= musicaFim) audio.currentTime = musicaInicio;
  });

  audio.addEventListener("ended", function () {
    audio.currentTime = musicaInicio;
    audio.play();
  });

  audio.addEventListener("play", atualizarBotaoMusica);
  audio.addEventListener("pause", atualizarBotaoMusica);
  audio.addEventListener("error", esconderMusica);

  btnMusica.addEventListener("click", function () {
    if (audio.paused) {
      var p = audio.play();
      if (p && p.catch) p.catch(esconderMusica);
    } else {
      audio.pause();
    }
  });

  // ---------- Início ----------
  criarCoracoes();
  montarMensagem();
  prepararMusica();
  setTimeout(mostrarPergunta, (CONFIG.segundosPergunta || 5) * 1000);
})();
