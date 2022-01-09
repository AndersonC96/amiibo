/*
 * Copyright (c) Simon Breil 2021
 */

// Élément représentant la liste des amiibos
const amiiboListElement = document.getElementById("amiibo-list");// Pega o elemento da lista de amiibos
document.addEventListener("DOMContentLoaded", async () => {// Quando o documento estiver carregado
    let isAtBottom = false;// Variavel para saber se estamos no final da lista
    let currentPage = 0;// Variavel para saber qual é a pagina atual
    const amiiboList = new AmiiboFetcher();// Instancia o objeto
    const data = await amiiboList.getPaginatedAmiibos(currentPage, AMOUNT_PER_PAGE);// Pega os amiibos
    hideLoading();// Esconde o loading
    if(data){// Se tiver dados
        addAmiibos(data);// Adiciona os amiibos
        updateListTitle((await amiiboList.getAmiibos()).length);// Atualiza o titulo da lista
        window.addEventListener("scroll", async event => {// Quando o usuario rola a pagina
            if((window.innerHeight + window.scrollY) + SCROLL_TOLERANCE >= document.body.offsetHeight){// Se estamos no final da pagina
                if(!isAtBottom){// Se nao estamos no final da lista
                    isAtBottom = true;// Atualiza a variavel
                    addAmiibos(await amiiboList.getPaginatedAmiibos(++currentPage, AMOUNT_PER_PAGE));// Adiciona os amiibos
                }
            }else{// Se nao estamos no final da pagina
                isAtBottom = false;// Atualiza a variavel
            }
        });
    }else{// Se nao tiver dados
        displayError();// Mostra o erro
    }
});