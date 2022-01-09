const createAmiiboElement = (id, name, gameSeries, image) => {
    const amiiboSpriteImg = document.createElement("img");// Criamos a imagem do amiibo
    amiiboSpriteImg.classList.add("amiibo-sprite");// Adicionamos a classe amiibo-sprite
    amiiboSpriteImg.setAttribute("src", image);// Definimos a imagem do amiibo
    amiiboSpriteImg.setAttribute("alt", name + " (" + gameSeries + ")");// Definimos a descrição da imagem
    amiiboSpriteImg.addEventListener("load", event => {// Quando a imagem carregar
        event.target.style.opacity = "1";// Alteramos a opacidade para 1
    });
    const amiiboShadowImg = amiiboSpriteImg.cloneNode();// Criamos uma cópia da imagem do amiibo
    amiiboShadowImg.classList.remove("amiibo-sprite");// Removemos a classe amiibo-sprite
    amiiboShadowImg.classList.add("amiibo-shadow");// Adicionamos a classe amiibo-shadow
    amiiboShadowImg.setAttribute("alt", "");// Definimos a descrição da imagem
    const leftSprinkle = document.createElement("img");// Criamos a imagem da sombra esquerda
    leftSprinkle.setAttribute("src", "img/icons/btn_sprinkles_left.svg");// Definimos a imagem da sombra esquerda
    const rightSprinkle = document.createElement("img");// Criamos a imagem da sombra direita
    rightSprinkle.setAttribute("src", "img/icons/btn_sprinkles_right.svg");// Definimos a imagem da sombra direita
    const amiiboBtn = document.createElement("btn");// Criamos o botao do amiibo
    amiiboBtn.classList.add("amiibo-btn");// Adicionamos a classe amiibo-btn
    amiiboBtn.setAttribute("href", "amiibo.php?id=" + id);// Definimos o link do botao
    amiiboBtn.appendChild(leftSprinkle);// Adicionamos a imagem da sombra esquerda
    amiiboBtn.innerHTML += " Veja o amiibo ";// Adicionamos o texto do botao
    amiiboBtn.appendChild(rightSprinkle);// Adicionamos a imagem da sombra direita
    const spriteContainerDiv = document.createElement("div");// Criamos o container do amiibo
    spriteContainerDiv.classList.add("sprite-container");// Adicionamos a classe sprite-container
    spriteContainerDiv.append(amiiboBtn, amiiboSpriteImg, amiiboShadowImg);// Adicionamos os elementos ao container
    const titleNameElement = document.createElement("h3");// Criamos o titulo do amiibo
    titleNameElement.textContent = name;// Definimos o texto do titulo
    const titleGameSeriesElement = document.createElement("h4");// Criamos o subtitulo do amiibo
    titleGameSeriesElement.textContent = gameSeries;// Definimos o texto do subtitulo
    const amiiboElement = document.createElement("a");// Criamos o link do amiibo
    amiiboElement.classList.add("amiibo");// Adicionamos a classe amiibo
    amiiboElement.setAttribute("id", ID_PREFIX + id);// Definimos o id do link
    amiiboElement.setAttribute("href", "amiibo.php?id=" + id);// Definimos o link do link
    amiiboElement.append(spriteContainerDiv, titleNameElement, titleGameSeriesElement);// Adicionamos os elementos ao link
    amiiboListElement.appendChild(amiiboElement);// Adicionamos o link ao container
};
const addAmiibos = amiibos => {// Função que adiciona os amiibos à lista
    let amiibo;// Amiibo
    for(let i = 0; i < amiibos.length; i++){// Para cada amiibo
        amiibo = amiibos[i];// Definimos o amiibo
        createAmiiboElement(amiibo.head + amiibo.tail, amiibo.name, amiibo.gameSeries, amiibo.image);// Adicionamos o amiibo à lista
    }
};
const updateListTitle = amiiboAmount => {// Função que atualiza o título da lista
    const amiiboListTitleElement = document.getElementById("amiibo-list-title");// Definimos o título da lista
    amiiboListTitleElement.textContent = `Todos os amiibos (${amiiboAmount})`;// Definimos o texto do título
};
const hideLoading = () => {// Função que esconde o loading
    const loadingImg = document.getElementById("loading-img");// Definimos a imagem de loading
    loadingImg.classList.add("hidden");// Adicionamos a classe hidden
};
const displayError = () => {// Função que mostra o erro
    const errorElement = document.createElement("div");// Criamos o elemento de erro
    const textElement = document.createElement("span");// Criamos o elemento de texto
    errorElement.classList.add("error");// Adicionamos a classe error
    textElement.textContent = "Sem amiibo para mostrar.";// Definimos o texto do elemento
    errorElement.appendChild(textElement);// Adicionamos o elemento de texto ao elemento de erro
    amiiboListElement.appendChild(errorElement);// Adicionamos o elemento de erro à lista
};