const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerMenu = document.getElementById("hamburger-menu");
const closeMenuLink = document.getElementById("close-menu-link");
const handModeBtn = document.getElementById("change-hand-mode");
hamburgerBtn.addEventListener("click", () => {// Quando clicamos no botão de hambúrguer
    openMenu();// Abrimos o menu
});
closeMenuLink.addEventListener("click", () => {// Quando clicamos no botão de fechar o menu
    closeMenu();// Fechamos o menu
})
handModeBtn.addEventListener("click", () => {// Quando clicamos no botão de mudar de mode
    toggleHandMode();// Mudamos o mode
});
const openMenu = () => {// Abrimos o menu
    hamburgerBtn.classList.add("hidden");// Escondemos o botão de hambúrguer
    hamburgerMenu.classList.add("open");// Mostramos o menu
};
const closeMenu = () => {// Fechamos o menu
    hamburgerBtn.classList.remove("hidden");// Mostramos o botão de hambúrguer
    hamburgerMenu.classList.remove("open");// Escondemos o menu
};
const toggleHandMode = () => {// Mudamos o mode
    let menuBotton = document.querySelector("#hamburger-menu .bottom");// pegamos o botão do menu
    let handModeText = document.querySelector("#change-hand-mode span");// pegamos o texto do botão
    let handModeImg = document.querySelector("#change-hand-mode img");// pegamos a imagem do botão
    if(menuBotton.classList.contains("lefty")){// se o botão estiver com a classe lefty
        menuBotton.classList.remove("lefty");// remove a classe lefty
        hamburgerBtn.classList.add("left");// adiciona a classe left
        hamburgerBtn.classList.remove("right");// remove a classe right
        handModeText.textContent = "Modo canhoto";// altera o texto do botão
        handModeImg.setAttribute("src", "img/icons/left_hand_icon.svg");// altera a imagem do botão
        handModeImg.setAttribute("alt", "Mão esquerda");// altera a descrição da imagem do botão
    }else{
        menuBotton.classList.add("lefty");// adiciona a classe lefty
        hamburgerBtn.classList.remove("left");// remove a classe left
        hamburgerBtn.classList.add("right");// adiciona a classe right
        handModeText.textContent = "Modo destro";// altera o texto do botão
        handModeImg.setAttribute("src", "img/icons/right_hand_icon.svg");// altera a imagem do botão
        handModeImg.setAttribute("alt", "Mão direita");// altera a descrição da imagem do botão
    }
};