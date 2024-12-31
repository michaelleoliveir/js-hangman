let palavra = "";
let erros = 0;

const listaPalavras = [
    "JAVASCRIPT",
    "FRONTEND",
    "BACKEND",
    "ALGORITMO",
    "REACT",
    "NODEJS",
    "HTML",
    "CSS",
    "JAVA",
    "TYPESCRIPT",
    "NATIVE",
    "GIT",
    "GITHUB",
    "API",
    "FRAMEWORK",
    "DEPLOY",
    "DEBUG",
    "FULLSTACK",
    "SQL",
    "PYTHON",
    "ANGULAR",
    "VUE",
    "SASS",
    "BOOTSTRAP",
    "DOCKER",
    "LINUX",
    "TERMINAL",
    "SHELL",
    "FLUTTER",
    "SPRING",
    "MONGODB",
    "JQUERY",
    "VSCODE",
    "MYSQL",
    "CLOUD",
    "FIREBASE",
    "JSON",
    "REST",
    "AJAX",
    "DEVOPS",
    "CACHE",
    "NPM",
    "PROXY",
    "HTTPS",
    "PHP",
    "RUBY",
    "C",
    "KOTLIN",
    "SWIFT",
    "ANDROID",
    "IOS",
];

// função para gerar a palavra aleatória que será adivinhada
function palavraAleatoria() {
    const randomIndex = Math.floor(Math.random() * listaPalavras.length);
    return listaPalavras[randomIndex];
}

// função para gerar o teclado que será exibido
function gerarTeclado() {
    const teclado = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    let keyboard = document.getElementById("keyboard");

    // para cada item da array (linha)
    teclado.forEach((row) => {
        const linhaTeclado = document.createElement("div");
        linhaTeclado.classList.add("keyboard-row");

        // para cada item da linha (letter)
        row.split("").forEach((letter) => {
            const botao = document.createElement("button");
            botao.classList.add("keyboard-button");
            botao.innerText = letter;

            linhaTeclado.appendChild(botao);

            botao.addEventListener("click", () => manipularValor(letter));
        });

        keyboard.appendChild(linhaTeclado);
    });
}

// função para exibir a quantidade de letras da palavra
function gerarPalavra() {
    palavra = palavraAleatoria();

    const palavraDisplay = document.getElementById("word-display");

    palavra.split("").forEach(() => {
        const span = document.createElement("span");
        span.classList.add("letter-space");
        span.innerText = "_";

        palavraDisplay.appendChild(span);
    });
}

// função para manipular a letra inserida pelo usuário
function manipularValor(letter) {
    if (palavra.includes(letter)) {
        atualizarDisplay(letter);

        const spans = document.querySelectorAll(".letter-space")
        const secretWord = Array.from(spans).map((span) => span.innerText).join('');

        if(secretWord === palavra) {
            swal({
                title: "Parabéns!",
                text: "Você adivinhou a palavra secreta.",
                icon: "success",
            });
            reset();
        }
    } else {
        atualizarForca();
    }
}

function atualizarDisplay(letter) {
    const span = document.querySelectorAll(".letter-space");

    palavra.split("").forEach((char, index) => {
        if (char === letter) {
            span[index].innerText = letter;
        }
    });
}

function atualizarForca() {
    const imagens = [
        "assets/images/img1.png",
        "assets/images/img2.png",
        "assets/images/img3.png",
        "assets/images/img4.png",
        "assets/images/img5.png",
        "assets/images/img6.png",
        "assets/images/img7.png",
    ];

    erros++;
    const imagemForca = document.getElementById("forca-imagem");

    if (erros < imagens.length) {
        imagemForca.src = imagens[erros];
    } else {
        swal({
            title: "Tente novamente",
            text: "Você já usou todas as suas chances",
            icon: "error",
        });

        reset()
    }
}

function reset() {
    palavra = "";
    erros = 0;

    const imagemForca = document.getElementById("forca-imagem");
    imagemForca.src = "assets/images/img1.png"

    const keyboard = document.getElementById("word-display")
    keyboard.innerHTML = ""

    gerarPalavra()
}

const botaoReiniciar = document.getElementById("button-reset")
botaoReiniciar.addEventListener("click", () => reset())

gerarTeclado();
gerarPalavra();
