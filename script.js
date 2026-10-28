
// IA utilizada: ChatGPT, da OpenAI.
// Finalidade: auxiliar na organização, criação e explicação do código
// JavaScript do portfólio pessoal de Rivia Mirelle.
// O código foi comentado para facilitar o estudo e a compreensão.

// ==================================================
// 1. MENU HAMBÚRGUER
// ==================================================

// Busca o botão e a navegação no HTML.
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#menu-principal");

// Abre ou fecha o menu quando o botão é clicado.
menuToggle.addEventListener("click", () => {
    // Verifica se o menu já está aberto.
    const menuEstaAberto =
        menuToggle.getAttribute("aria-expanded") === "true";

    // Inverte o estado atual do menu.
    menuToggle.setAttribute(
        "aria-expanded",
        String(!menuEstaAberto)
    );

    // Atualiza o texto acessível do botão.
    menuToggle.setAttribute(
        "aria-label",
        menuEstaAberto ? "Abrir menu" : "Fechar menu"
    );

    // A classe open controla a exibição do menu no CSS.
    mainNav.classList.toggle("open", !menuEstaAberto);
});

// Fecha o menu quando uma seção é selecionada.
mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        // Atualiza o estado e o nome do botão.
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});


// ==================================================
// 2. SAUDAÇÃO AUTOMÁTICA
// ==================================================

// Escolhe uma saudação de acordo com o horário atual.
function atualizarSaudacao() {
    const horaAtual = new Date().getHours();
    const saudacao = document.querySelector("#saudacao");

    // Define a mensagem de acordo com a hora.
    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao.textContent = "Bom dia! Seja bem-vindo(a).";
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao.textContent = "Boa tarde! Seja bem-vindo(a).";
    } else {
        saudacao.textContent = "Boa noite! Seja bem-vindo(a).";
    }
}

// Executa a função assim que o arquivo é carregado.
atualizarSaudacao();


// ==================================================
// 3. MODO CLARO E ESCURO
// ==================================================

// Busca o botão que alterna os temas.
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");

// Alterna as cores quando o usuário clica no botão.
themeToggle.addEventListener("click", () => {
    // Adiciona ou remove a classe que ativa o modo escuro.
    const modoEscuroAtivo =
        document.body.classList.toggle("dark-mode");

    // Altera o símbolo do botão.
    themeIcon.textContent = modoEscuroAtivo ? "☀" : "☾";

    // Atualiza a descrição para leitores de tela.
    themeToggle.setAttribute(
        "aria-label",
        modoEscuroAtivo ? "Ativar modo claro" : "Ativar modo escuro"
    );

    themeToggle.setAttribute(
        "title",
        modoEscuroAtivo ? "Ativar modo claro" : "Ativar modo escuro"
    );
});


// ==================================================
// 4. ANO AUTOMÁTICO
// ==================================================

// Obtém o ano atual e atualiza o rodapé.
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();


// ==================================================
// 5. BOTÃO VOLTAR AO INÍCIO
// ==================================================

// Busca o botão flutuante e a seção inicial.
const backToTop = document.querySelector("#back-to-top");
const inicio = document.querySelector("#inicio");

// Mostra o botão depois que o usuário rolar a página.
function atualizarBotaoTopo() {
    if (window.scrollY > 350) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

// Verifica a rolagem da página.
window.addEventListener("scroll", atualizarBotaoTopo);

// Verifica também a posição inicial ao carregar.
atualizarBotaoTopo();

// Garante que o clique leve à seção inicial.
backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    // Volta ao início com rolagem suave.
    inicio.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    // Atualiza o endereço da página sem recarregá-la.
    history.replaceState(null, "", "#inicio");
});


// ==================================================
// 6. LINK DO PROJETO NO FIGMA
// ==================================================

// Coloque o endereço real do seu projeto entre as aspas.
// Exemplo: https://www.figma.com/design/...
const linkDoFigma = "";

// Busca o link que aparece no cartão do projeto.
const figmaProjectLink = document.querySelector("#figma-project-link");

// Só ativa o link quando um endereço for informado.
if (linkDoFigma.trim() !== "") {
    figmaProjectLink.href = linkDoFigma;
    figmaProjectLink.target = "_blank";
    figmaProjectLink.rel = "noopener noreferrer";
    figmaProjectLink.innerHTML =
        'Visualizar projeto <span aria-hidden="true">↗</span>';
} else {
    // Informa que o link ainda precisa ser adicionado.
    figmaProjectLink.addEventListener("click", (event) => {
        event.preventDefault();

        alert("Adicione o link do seu projeto do Figma no arquivo script.js.");
    });
}



// ==================================================
// 7. CARROSSEL PAGINADO (FADE SUAVE E INFINITO)
// ==================================================

const slides = document.querySelectorAll('.carousel-slide');
const nextButton = document.querySelector('#nextBtn');
const prevButton = document.querySelector('#prevBtn');

let currentIndex = 0;
let autoplayInterval;

// Função que gerencia qual foto está visível
function showSlide(index) {
    // 1. Remove a classe 'active' de TODAS as fotos (escondendo todas)
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // 2. Adiciona a classe 'active' apenas na foto atual (fazendo ela aparecer com fade)
    slides[index].classList.add('active');
}

// Vai para a próxima foto
function nextSlide() {
    // Se chegar na última foto, volta para a primeira (índice 0)
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Vai para a foto anterior
function prevSlide() {
    // Se estiver na primeira, vai para a última
    if (currentIndex === 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex--;
    }
    showSlide(currentIndex);
}

// Inicia a contagem de 10 segundos
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // TEMPO 
}

// Para a contagem
function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Inicializa o carrossel mostrando a primeira foto
showSlide(currentIndex);
startAutoplay();

// Eventos dos botões (setinhas)
nextButton.addEventListener('click', () => {
    stopAutoplay();
    nextSlide();
    startAutoplay(); // Reinicia a contagem de 10s após o clique
});

prevButton.addEventListener('click', () => {
    stopAutoplay();
    prevSlide();
    startAutoplay();
});

// Pausa a passagem automática quando o mouse está em cima do carrossel
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);


// ==================================================
// OBSERVAÇÃO SOBRE O FORMULÁRIO
// ==================================================

// Este portfólio utiliza links diretos para contato, sem formulário.
// Por isso, não há validação de campos, e-mail, mensagem ou consentimento.
// Caso a atividade exija especificamente essa validação, será necessário
// incluir um formulário e programar as verificações correspondentes.
