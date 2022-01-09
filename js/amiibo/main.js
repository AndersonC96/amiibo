document.addEventListener("DOMContentLoaded", async () => {
    const url = new URL(window.location.href);// Pega o url
    const amiiboId = url.searchParams.get("id");// Pega o id
    const amiiboList = new AmiiboFetcher();// Instancia o objeto
    let amiibo;// Variavel para armazenar o amiibo
    if(amiiboId){// Se tiver um id
        amiibo = await amiiboList.getAmiiboById(amiiboId, false, true);// Pega o amiibo pelo id
    }else if(url.searchParams.has("random")){// Se tiver o parametro random
        amiibo = await amiiboList.getRandomAmiibo(false, true);// Pega um amiibo aleatorio
    }else{// Se nao tiver nenhum parametro
        window.location.replace("?random");// Redireciona para a pagina random
    }
    if(!amiibo){// Se nao tiver um amiibo
        window.location.replace("?random");// Redireciona para a pagina random
    }
    displayAmiibo(amiibo);// Mostra o amiibo
});