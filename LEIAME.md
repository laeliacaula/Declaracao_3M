# Declaração de 3 Meses 💗

Página web estática (HTML, CSS e JavaScript). Quem recebe só precisa abrir o link — não precisa instalar nada.

## Arquivos

| Arquivo / pasta | Para que serve |
|---|---|
| `index.html` | Estrutura da página |
| `style.css` | Visual, animações e adaptação a celular |
| `script.js` | Corações, pergunta, carrossel e música |
| `config.js` | **Único arquivo que você precisa editar** |
| `fotos/` | Fotos do casal |
| `musica/` | Música (opcional) |

## Trocar as fotos

A página exibe **automaticamente** as fotos que estiverem na pasta `fotos` — não é preciso editar nenhum arquivo.

1. Nomeie as fotos como `foto01.jpg`, `foto02.jpg`, `foto03.jpg`… (aceita `.jpg`, `.jpeg`, `.png` e `.webp`). Fotos com outros nomes são ignoradas.
2. A ordem de exibição segue a numeração. Para remover uma foto, basta apagá-la da pasta; buracos na numeração não têm problema.
3. Pode usar até 99 fotos. Com até 3 (ou 1 no celular) elas ficam paradas; com mais, passam em carrossel infinito.

**Fotos do iPhone (.HEIC) não funcionam** no Chrome, Android e Windows — converta para JPG antes (no iPhone: *Ajustes → Câmera → Formatos → Mais Compatível*, ou exporte/compartilhe como JPG).

**Dica de peso:** redimensione as fotos para ~1200 px no lado maior (200–400 KB cada) para carregar rápido no celular. Ex.: https://squoosh.app. Fotos verticais (retrato) ficam melhores — o recorte é 3:4.

## Trocar a mensagem final

Em `config.js`, edite `mensagemFinal`. A primeira linha aparece em destaque (letra cursiva); as demais logo abaixo.

> ⚠️ Antes de publicar, confirme os períodos: o texto atual fala em "7 meses incríveis" e "3 meses de namoro".

## Música

1. Coloque o arquivo em `musica/musica.mp3` (ou outro nome e ajuste `musica` no `config.js`).
2. O trecho que toca em loop é definido em `musicaInicio` e `musicaFim` (em segundos) no `config.js` — hoje de 0:10 a 0:58. Para tocar a música inteira, use `0` nos dois.
3. Ela começa ao clicar em **Sim** e aparece um botão 🎵 no canto para pausar/tocar.
4. Para não ter música: `musica: ""`. Se o arquivo estiver faltando, a página funciona normalmente, só sem o botão.

## Testar no computador

- **VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html` → *Open with Live Server*.
- **Ou** dê dois cliques em `index.html` (funciona na maioria dos navegadores).

## Publicar (gerar um link)

### Opção A — Netlify Drop (mais simples)
1. Acesse https://app.netlify.com/drop e crie uma conta gratuita.
2. Arraste a pasta inteira do projeto para a página.
3. Copie o link gerado (dá para renomeá-lo em *Site settings*).

### Opção B — GitHub Pages
1. Crie um repositório no GitHub e envie os arquivos (botão *Add file → Upload files*).
2. Em *Settings → Pages*, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Após ~1 minuto o link aparece no topo da página de configurações.

Não envie a pasta `.claude` nem o arquivo `spec_projeto_declaracao_3_meses.md` — não são necessários.

## Privacidade

Qualquer pessoa com o link consegue ver as fotos. A página não coleta dados, não tem formulário e não usa rastreamento. A única conexão externa é a fonte do Google Fonts (se ela não carregar, a página usa uma fonte do sistema).
