# ✨ Classificador de Imagens Interativo com Teachable Machine & TensorFlow.js ✨

[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS%203-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)]()
[![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)]()
[![Teachable Machine](https://img.shields.io/badge/Teachable_Machine-Orange?style=for-the-badge&logo=google&logoColor=white)]()

Bem-vindo a este projeto de Classificador de Imagens! 🖼️🧠

Este projeto foi desenvolvido como parte dos estudos em **Robótica e Sistemas Inteligentes**, demonstrando como treinar um modelo de reconhecimento de imagem usando o **Google Teachable Machine** (a partir de um dataset do **Kaggle**) e implantá-lo em uma página web interativa usando **TensorFlow.js**.

A aplicação permite que você faça upload de uma imagem (ou arraste e solte!) e veja a classificação do modelo em tempo real, diretamente no seu navegador.

## 🚀 Demonstração Rápida

**(Opcional, mas altamente recomendado!)**

* [Insira um GIF animado ou Screenshot aqui mostrando o classificador em ação! Ex: Upload de imagem -> Clique em Classificar -> Resultados aparecendo]

## ✅ Funcionalidades Principais

* **Upload de Imagem:** Selecione arquivos clicando ou usando o sistema de *arrastar e soltar* (Drag and Drop).
* **Preview Instantâneo:** Visualize a imagem que você selecionou antes de classificar.
* **Classificação no Navegador:** Utiliza TensorFlow.js para rodar o modelo do Teachable Machine diretamente no cliente, sem necessidade de backend.
* **Resultados Detalhados:** Mostra as classes previstas pelo modelo com suas respectivas probabilidades em barras de progresso.
* **Interface Amigável:** Indicadores visuais para carregamento do modelo e análise da imagem.
* **Tratamento de Erros:** Mensagens claras caso o modelo não carregue ou ocorra erro na classificação.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura da página web.
* **CSS3:** Estilização e aparência visual (arquivo `styles.css`).
* **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e interações.
* **TensorFlow.js:** Biblioteca para carregar e executar o modelo de Machine Learning no navegador.
* **Google Teachable Machine:** Plataforma usada para treinar o modelo de classificação de imagens de forma visual e exportá-lo para formato compatível com TensorFlow.js.
* **Kaggle:** Fonte do dataset utilizado para treinar o modelo (mencione qual dataset você usou, se desejar!).

## ⚙️ Configuração e Execução Local

1.  **Clone ou Baixe o Repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    # ou baixe o ZIP e extraia
    ```
2.  **Navegue até a Pasta:**
    ```bash
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```
3.  **(⚠️ Passo Crucial!) Atualize a URL do Modelo:**
    * Abra o arquivo `script.js`.
    * Localize a linha: `const modelURL = 'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/';`
    * Substitua `'https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/'` pela **URL completa do seu próprio modelo** exportado do Teachable Machine.
4.  **Abra o `index.html`:**
    * Abra o arquivo `index.html` diretamente no seu navegador de preferência (Chrome, Firefox, Edge, etc.).
    * *Nota: Se encontrar problemas de CORS (raro para carregar modelos do Teachable Machine via HTTPS, mas pode acontecer com outros recursos locais), talvez precise usar um servidor web local simples (como a extensão "Live Server" do VS Code ou `python -m http.server`).*

## 👉 Como Usar

1.  **Aguarde o Modelo Carregar:** Uma mensagem "Carregando modelo..." será exibida inicialmente. Espere até que ela desapareça.
2.  **Faça Upload da Imagem:**
    * Clique na área de upload para selecionar um arquivo de imagem (`.jpg`, `.png`, `.webp`).
    * Ou simplesmente arraste e solte um arquivo de imagem na área designada.
3.  **Clique em "Classificar Imagem":** O botão ficará ativo após o modelo carregar e uma imagem ser selecionada.
4.  **Veja os Resultados:** A aplicação mostrará as classificações mais prováveis para a imagem, com barras indicando a confiança do modelo.

## 🔄 Usando Seu Próprio Modelo

Este projeto é totalmente adaptável para usar qualquer modelo de classificação de imagem treinado no Teachable Machine!

1.  Treine seu modelo no [Google Teachable Machine](https://teachablemachine.withgoogle.com/).
2.  Exporte o modelo no formato **Tensorflow.js** (escolha a opção "Upload / Shareable Link").
3.  Copie a URL compartilhável gerada.
4.  Cole essa URL no arquivo `script.js`, substituindo o valor da constante `modelURL`.
5.  (Opcional) Verifique se o tamanho de imagem esperado pelo seu modelo (`Image size` no Teachable Machine) corresponde ao usado na função `resizeNearestNeighbor` no `script.js` (geralmente `[224, 224]`).
6.  Atualize a página e pronto! O classificador agora usará o seu modelo personalizado.

---

*Sinta-se à vontade para contribuir, reportar bugs ou sugerir melhorias!*