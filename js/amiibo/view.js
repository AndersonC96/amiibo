const displayAmiibo = amiibo => {// mostra os amiibos
    const amiiboSprite = document.getElementById("amiibo-sprite");// sprite do amiibo
    const nameTitle = document.querySelector("#main-titles h2");// titulo do amiibo
    const gameTitle = document.querySelector("#main-titles h3");// titulo do jogo
    const releaseText = document.querySelector("#releases p");// texto de lançamento
    amiiboSprite.setAttribute("src", amiibo.image);// seta a imagem do amiibo
    amiiboSprite.setAttribute("alt", amiibo.name + " (" + amiibo.gameSeries + ")");// seta o alt do amiibo
    nameTitle.textContent = amiibo.name;// seta o nome do amiibo
    gameTitle.textContent = amiibo.gameSeries;// seta o nome do jogo
    let keys = Object.keys(amiibo.release);// pega as chaves do objeto
    for(let i = 0; i < keys.length; i++){// percorre as chaves
        const key = keys[i];// pega a chave
        if(key && REGIONS.hasOwnProperty(key)){// se a chave existir
            if(amiibo.release[key]){// se o valor da chave for true
                let date = new Date(amiibo.release[key]);// cria uma data
                let day = date.getDate();// pega o dia
                let month = date.getMonth() + 1;// pega o mes
                let year = date.getFullYear();// pega o ano
                day = day.toString().length < 2 ? "0" + day : day;// se o dia for menor que 10, adiciona um 0 antes
                month = month.toString().length < 2 ? "0" + month : month;// se o mes for menor que 10, adiciona um 0 antes
                releaseText.innerHTML += REGIONS[key] + " : <b>" + day + "/" + month + "/" + year + "</b>";// adiciona o texto de lançamento
            }else{// se o valor da chave for false
                releaseText.innerHTML += REGIONS[key] + " : <b>-</b>";// adiciona o texto de lançamento
            }
        }
        if(i !== keys.length - 1){// se nao for a ultima chave
            releaseText.innerHTML += " | ";// adiciona o texto de lançamento
        }
    }
    if(amiibo.gamesSwitch){// se tiver um jogo para o switch
        for(let i = 0; i < amiibo.gamesSwitch.length; i++){// percorre os jogos
            let game = amiibo.gamesSwitch[i];// pega o jogo
            addGame(game, "Switch");// adiciona o jogo
        }
    }
    if(amiibo.gamesWiiU){// se tiver um jogo para o wii u
        for(let i = 0; i < amiibo.gamesWiiU.length; i++){// percorre os jogos
            let game = amiibo.gamesWiiU[i];// pega o jogo
            addGame(game, "Wii U");// adiciona o jogo
        }
    }
    if(amiibo.games3DS){// se tiver um jogo para o 3ds
        for(let i = 0; i < amiibo.games3DS.length; i++){// percorre os jogos
            let game = amiibo.games3DS[i];// pega o jogo
            addGame(game, "3DS");// adiciona o jogo
        }
    }
    hideLoading();// esconde o loading
    showPage();// mostra a pagina
};
const addGame = (game, console) => {// adiciona o jogo
    const gamesContainer = document.getElementById("games");// container dos jogos
    const usageListElement = document.createElement("ul");// lista de uso
    game.amiiboUsage.forEach(feature => {// percorre as features
        let usageElement = document.createElement("li");// cria o elemento de uso
        usageElement.textContent = feature.Usage;// seta o texto do uso
        usageListElement.append(usageElement);// adiciona o elemento de uso
    });
    const gameTitle = document.createElement("h5");// titulo do jogo
    gameTitle.innerHTML = game.gameName + " <span> • " + console + "</span>";// seta o titulo do jogo
    const gameElement = document.createElement("article");// elemento do jogo
    gameElement.append(gameTitle, usageListElement);// adiciona o titulo e a lista de uso
    switch(console){// verifica qual console
        case "3DS":
            gameElement.classList.add("threeds-game");// adiciona a classe do jogo
            break;
        case "Wii U":
            gameElement.classList.add("wiiu-game");// adiciona a classe do jogo
            break;
        case "Switch":
            gameElement.classList.add("switch-game");// adiciona a classe do jogo
            break;
    }
    gamesContainer.appendChild(gameElement);// adiciona o jogo
};
const hideLoading = () => {// esconde o loading
    const loadingImg = document.getElementById("loading-img");// imagem de loading
    loadingImg.classList.add("hidden");// adiciona a classe hidden
}
const showPage = () => {// mostra a pagina
    const backLink = document.getElementById("back-link");// link de voltar
    const mainElement = document.getElementsByTagName("main")[0];// elemento principal
    backLink.classList.remove("hidden");// remove a classe hidden
    mainElement.classList.remove("hidden");// remove a classe hidden
};