// =====================================================
//  CONFIGURAÇÃO — este é o único arquivo que você precisa editar
// =====================================================
window.CONFIG = {
  // Fotos: não precisam ser listadas aqui. A página exibe automaticamente
  // os arquivos da pasta "fotos" chamados foto01, foto02, foto03...
  // (.jpg, .jpeg, .png ou .webp), na ordem da numeração.

  // Mensagem final (cada item é uma linha).
  // ATENÇÃO: confirme os períodos (7 meses x 3 meses) antes de publicar.
  mensagemFinal: [
    "Meu dia 7 se tornou especial por sua causa!",
    "Obrigada pelos 7 meses incríveis e Feliz 3 meses de namoro 💗"
  ],

  // Música (opcional). Coloque o arquivo na pasta "musica".
  // Para desativar, use: musica: ""
  musica: "musica/musica.mp3",

  // Trecho da música que toca em loop (em segundos). 0:10 = 10, 0:58 = 58.
  // Para tocar a música inteira: musicaInicio: 0, musicaFim: 0
  musicaInicio: 10,
  musicaFim: 58,

  // Segundos até a pergunta "Deseja continuar?" aparecer.
  segundosPergunta: 3,

  // Segundos entre cada movimento do carrossel.
  segundosPorFoto: 3
};
