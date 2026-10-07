# Especificação do Projeto — Declaração de 3 Meses

## 1. Objetivo

Criar uma experiência digital romântica e interativa para comemorar 3 meses de namoro.

A experiência deve funcionar como uma pequena apresentação/declaração personalizada, com animações, interação do usuário, fotos do casal e uma mensagem final.

O resultado deve ser acessível tanto em notebook/computador quanto em celular, sem exigir que a pessoa instale Python, VS Code ou qualquer outro programa.

---

## 2. Tecnologias

A solução deverá utilizar tecnologias web compatíveis com navegadores modernos.

### Tecnologias principais

- HTML para a estrutura da experiência.
- CSS para aparência, responsividade, animações e transições.
- JavaScript para interações, temporização, controle de telas, carrossel e comportamentos dinâmicos.

### Python

Python não é obrigatório para a execução da experiência.

Caso seja utilizado em alguma etapa auxiliar de desenvolvimento, geração ou organização de arquivos, a versão final deverá continuar funcionando sem que o usuário final precise possuir Python instalado.

---

## 3. Compatibilidade

A experiência deverá:

- Funcionar em notebooks e computadores.
- Funcionar em smartphones.
- Ser compatível com navegadores modernos.
- Adaptar o layout ao tamanho da tela.
- Não exigir instalação de software pela pessoa que receberá a declaração.
- Poder ser disponibilizada posteriormente por meio de um endereço web.

---

# 4. Estrutura geral da experiência

A experiência será dividida em duas etapas principais:

1. Tela inicial de abertura.
2. Tela de fotos e mensagem final.

A transição entre as duas etapas dependerá da interação da pessoa com a pergunta apresentada após 10 segundos.

---

# 5. Tela inicial

## 5.1 Conteúdo principal

Ao abrir a experiência, deverá aparecer uma tela romântica contendo:

**Feliz 3 meses**

A frase deverá ser o elemento visual principal da tela.

---

## 5.2 Corações animados

Ao redor da frase deverão aparecer diversos corações.

Características desejadas:

- Vários corações simultaneamente.
- Movimento semelhante a corações flutuando ou voando.
- Movimento contínuo.
- Diferentes tamanhos.
- Diferentes posições.
- Variação de velocidade.
- Aparência delicada e romântica.
- Os corações não devem prejudicar a leitura da mensagem principal.

Podem ser utilizados diferentes emojis de coração em tons de rosa/vermelho.

---

# 6. Temporização da pergunta

Após a abertura da experiência, a mensagem inicial deverá permanecer na tela por aproximadamente 10 segundos.

Após esse período, deverá aparecer uma nova interação:

**Deseja continuar?**

Com duas opções:

- Sim
- Não

A pergunta deverá aparecer de maneira suave, preferencialmente utilizando uma animação de entrada.

---

# 7. Comportamento do botão "Não"

Quando a pessoa selecionar **Não**:

- A pergunta deverá desaparecer.
- A tela inicial deverá permanecer visível.
- A animação dos corações poderá continuar.
- A pergunta não deverá aparecer novamente automaticamente.
- Não deverá ocorrer redirecionamento.
- Não deverá reiniciar a experiência.
- A pessoa deverá permanecer na tela inicial.

---

# 8. Comportamento do botão "Sim"

Quando a pessoa selecionar **Sim**:

- A pergunta deverá desaparecer.
- A tela inicial deverá deixar de ser exibida.
- Deverá ocorrer uma transição visual para a segunda etapa.
- A tela de fotos deverá ser apresentada.
- O carrossel de fotos deverá ser iniciado.
- Caso exista música na versão final, esse momento deverá ser utilizado como oportunidade para iniciar a reprodução, respeitando as restrições dos navegadores para reprodução automática.

---

# 9. Tela de fotos

A segunda etapa deverá apresentar as fotos do casal.

## 9.1 Quantidade de fotos

O projeto deverá aceitar qualquer quantidade razoável de fotos.

Não deverá existir uma quantidade fixa obrigatória de imagens.

---

# 10. Exibição das fotos

## 10.1 Computador/notebook

Em telas maiores, deverão ser exibidas simultaneamente **3 fotos**.

Exemplo conceitual:

- Foto 1
- Foto 2
- Foto 3

Depois:

- Foto 2
- Foto 3
- Foto 4

E assim sucessivamente.

---

## 10.2 Celular

Em telas pequenas, o layout deverá ser adaptado para preservar a qualidade visual.

Preferencialmente:

- Exibir uma foto por vez.
- Manter a proporção adequada da imagem.
- Evitar distorções.
- Evitar que a foto fique excessivamente pequena.
- Manter a mensagem final legível.

---

# 11. Carrossel de fotos

Caso existam mais de 3 fotos, as imagens deverão passar automaticamente em loop.

Requisitos:

- Movimento automático.
- Loop infinito.
- Transição suave.
- Não exigir interação manual.
- Não interromper a apresentação da mensagem.
- Não apresentar um salto visual perceptível ao retornar ao início.
- O efeito deverá dar a impressão de continuidade.

O carrossel deverá funcionar independentemente da quantidade de fotos cadastradas.

---

# 12. Fotos

As fotos serão fornecidas posteriormente.

O projeto deverá permitir que novas fotos sejam adicionadas ou removidas sem necessidade de reconstruir toda a experiência.

Recomendações para os arquivos das fotos:

- Nomes simples.
- Evitar espaços.
- Evitar caracteres especiais.
- Utilizar formatos comuns de imagem.
- Preferencialmente utilizar JPG, JPEG, PNG ou WebP.

---

# 13. Mensagem final

Abaixo das fotos deverá aparecer a mensagem:

> Meu dia 7 se tornou especial por sua causa!  
> Obrigada pelos 7 meses incríveis e Feliz 3 meses de namoro 💗

A mensagem deverá ter destaque visual, mas sem competir com as fotos.

---

# 14. Emoji/coração

O encerramento deverá utilizar um coração rosa semelhante ao estilo visual utilizado em aplicativos de mensagens.

O visual deverá permanecer romântico e delicado.

---

# 15. Design

A identidade visual deverá seguir uma estética:

- Romântica.
- Delicada.
- Feminina.
- Elegante.
- Moderna.
- Levemente divertida.
- Não excessivamente infantil.
- Com predominância de tons claros e rosados.

A interface deverá evitar aparência de formulário ou página corporativa.

A intenção é que a experiência pareça uma pequena surpresa romântica.

---

# 16. Animações

As animações deverão ser suaves.

Prioridades:

1. Entrada da mensagem inicial.
2. Corações flutuando.
3. Entrada da pergunta após 10 segundos.
4. Transição entre a primeira e a segunda tela.
5. Entrada das fotos.
6. Movimento contínuo do carrossel.

As animações não deverão causar travamentos ou tornar a experiência pesada.

---

# 17. Responsividade

O projeto deverá ser responsivo.

Deverá funcionar adequadamente em:

- Notebook.
- Desktop.
- Tablet.
- Smartphone em orientação vertical.
- Smartphone em orientação horizontal, quando possível.

O conteúdo deverá se adaptar automaticamente ao tamanho da tela.

---

# 18. Experiência do usuário

A pessoa que receber a declaração deverá conseguir utilizá-la sem qualquer instrução técnica.

Ela deverá apenas:

1. Abrir a página.
2. Visualizar a mensagem inicial.
3. Aguardar a pergunta.
4. Escolher "Sim" ou "Não".
5. Caso escolha "Sim", visualizar as fotos e a mensagem final.

Não deverá ser necessário:

- Instalar programas.
- Instalar Python.
- Abrir o VS Code.
- Executar comandos.
- Configurar o navegador.
- Instalar extensões.

---

# 19. Estrutura dos arquivos

O projeto deverá possuir uma organização simples e fácil de manter.

Estrutura conceitual:

- Arquivo principal da página.
- Arquivo de estilos.
- Arquivo de interações.
- Pasta exclusiva para as fotos.

A organização deverá permitir que as fotos sejam substituídas ou adicionadas posteriormente com facilidade.

---

# 20. Execução local

Durante o desenvolvimento, o projeto deverá poder ser testado localmente no computador.

O desenvolvimento será realizado utilizando o VS Code.

A experiência deverá ser validada no navegador antes da publicação.

---

# 21. Publicação

Após a finalização e os testes, o projeto deverá poder ser publicado gratuitamente em uma plataforma de hospedagem de páginas estáticas.

Objetivo da publicação:

- Gerar um endereço acessível pela internet.
- Permitir abertura pelo celular.
- Permitir abertura pelo notebook.
- Não exigir instalação de programas.
- Facilitar o envio pelo WhatsApp ou outro aplicativo de mensagens.

A plataforma de hospedagem deverá suportar HTML, CSS, JavaScript e arquivos de imagem.

---

# 22. Forma de entrega

A versão final deverá permitir duas formas de utilização:

### Durante o desenvolvimento

Uma cópia local do projeto para testes e alterações.

### Para a pessoa destinatária

Preferencialmente um link público para a experiência.

Opcionalmente, poderá existir também uma cópia compactada do projeto para backup.

---

# 23. Possível música

A inclusão de música é opcional.

Caso seja implementada:

- A música deverá começar preferencialmente após a interação com o botão "Sim".
- A experiência deverá respeitar as políticas dos navegadores relacionadas à reprodução automática.
- A música não deverá impedir o funcionamento da declaração.
- O arquivo de áudio deverá ser armazenado junto ao projeto ou utilizar uma fonte devidamente autorizada.
- A música deverá poder ser substituída facilmente.

---

# 24. Privacidade

As fotos são pessoais e deverão ser tratadas como conteúdo privado.

Caso o projeto seja publicado na internet:

- As imagens ficarão acessíveis a quem tiver acesso ao endereço público.
- Não deverão ser coletados dados pessoais da pessoa que acessar a página.
- Não deverá existir formulário de cadastro.
- Não deverá existir rastreamento desnecessário.
- Não deverá haver integração com serviços externos sem necessidade.

---

# 25. Performance

A experiência deverá carregar rapidamente, especialmente em celulares.

Para isso:

- Evitar arquivos desnecessariamente grandes.
- Otimizar as imagens antes da publicação quando necessário.
- Evitar animações excessivamente pesadas.
- Evitar bibliotecas externas sem necessidade.
- Priorizar uma implementação simples e leve.

---

# 26. Critérios de aceitação

O projeto será considerado concluído quando:

- A mensagem "Feliz 3 meses" aparecer corretamente.
- Os corações animados estiverem funcionando.
- A pergunta aparecer aproximadamente 10 segundos após a abertura.
- O botão "Não" ocultar a pergunta sem reiniciá-la.
- O botão "Sim" levar à tela de fotos.
- As fotos forem carregadas corretamente.
- Até 3 fotos forem exibidas simultaneamente em telas grandes.
- O layout se adapte ao celular.
- Mais de 3 fotos funcionem em carrossel.
- O carrossel seja contínuo.
- A mensagem final apareça corretamente.
- A experiência funcione sem Python instalado no dispositivo da destinatária.
- A experiência funcione em navegador.
- A versão publicada possa ser acessada por celular e notebook.

---

# 27. Melhorias futuras opcionais

Após a versão principal estar funcionando, poderão ser adicionados:

- Transição com corações entre as telas.
- Carrossel infinito sem salto perceptível.
- Música.
- Efeito de entrada individual das fotos.
- Efeito de brilho ou partículas.
- Contador de tempo de relacionamento.
- Mensagem personalizada adicional.
- Botão para pausar a música.
- Efeitos sonoros sutis.
- Animações adicionais nos corações.
- Tela final especial após o término das fotos.

---

# 28. Observação sobre a mensagem

Existe atualmente uma inconsistência que deverá ser corrigida antes da publicação final:

- A abertura menciona **3 meses de namoro**.
- A mensagem final menciona **7 meses incríveis** e **3 meses de namoro**.

A versão definitiva deverá confirmar quais períodos devem aparecer na mensagem para evitar informações conflitantes na declaração.

---

# 29. Resultado esperado

O resultado final deverá ser uma experiência digital romântica, simples de acessar e visualmente agradável, criada especificamente para a comemoração do relacionamento.

A experiência deverá transmitir a sensação de uma pequena surpresa personalizada, e não apenas de uma página web convencional.
