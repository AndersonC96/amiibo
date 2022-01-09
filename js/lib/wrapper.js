class AmiiboFetcher{
    amiibos = null;// amiibo array
    getAmiibos = async (showGames=false, showUsage=false) => {// get amiibos
        if(!this.amiibos){// se os amiibos não estiverem carregados
            const reponse = (await this.fetchAmiibos(showGames, showUsage));// pega os amiibos
            if(!reponse){// se não tiver dados
                return null;// retorna null
            }
            this.amiibos = reponse.data.amiibo;// atualiza os amiibos
        }
        return this.amiibos;// retorna os amiibos
    }
    getPaginatedAmiibos = async (page, amount, showGames=false, showUsage=false) => {// obter amiibos paginados
        if(!this.amiibos){// se os amiibos não estiverem carregados
            const reponse = (await this.fetchAmiibos(showGames, showUsage));// pega os amiibos
            if(!reponse){// se não tiver dados
                return null;// retorna null
            }
            this.amiibos = reponse.data.amiibo;// atualiza os amiibos
        }
        return this.amiibos.slice(page * amount, (page + 1) * amount);// retorna os amiibos paginados
    }
    getAmiiboById = async (id, showGames=false, showUsage=false) => {// obter amiibo por id
        let response;// response
        if(showGames || showUsage){// se for para mostrar jogos ou uso
            let amiibos = (await this.fetchAmiibos(showGames, showUsage)).data.amiibo;// pega os amiibos
            let response = null;// response
            let i = 0;// contador
            while(!response && i < amiibos.length){// enquanto não tiver dados e o contador for menor que o tamanho do array
                if(amiibos[i].head + amiibos[i].tail === id){// se o id for igual ao id do amiibo
                    response = amiibos[i];// atualiza o response
                }
                i++;// incrementa o contador
            }
            if(!response){// se não tiver dados
                return null;// retorna null
            }
            return response;// retorna o response
        }else{// se não for para mostrar jogos ou uso
            response = (await this.fetchAmiiboById(id, showGames, showUsage));// pega o amiibo
            if(!response){// se não tiver dados
                return null;// retorna null
            }
            return response.data.amiibo;// retorna o amiibo
        }
    };
    getRandomAmiibo = async (showGames=false, showUsage=false) => {// obter amiibo aleatório
        const response = (await this.getAmiibos(showGames, showUsage));// pega os amiibos
        if(!response){// se não tiver dados
            return null;// retorna null
        }
        return response[Math.round(Math.random() * response.length)];// retorna um amiibo aleatório
    }
    fetchAmiiboById = async id => {// obter amiibo por id
        return await this._fetchData("?id=" + id);// retorna os dados
    };
    fetchAmiibos = async (showGames=false, showUsage=false) => {// obter amiibos
        let parameters;// parâmetros
        if(showGames){// se for para mostrar jogos
            parameters = "?showgames" + (showUsage ? "&showusage" : "");// atualiza os parâmetros
        }else if(showUsage){// se for para mostrar uso
            parameters = "?showusage" + (showGames ? "&showgames" : "");// atualiza os parâmetros
        }
        return await this._fetchData(parameters);// retorna os dados
    };
    fetchAmiibosOfType = async (type, showGames=false, showUsage=false) => {// obter amiibos de um tipo
        let parameters = "?type=" + type + (showGames ? "&showgames" : "") + (showUsage ? "&showusage" : "");// atualiza os parâmetros
        return await this._fetchData(parameters);// retorna os dados
    };
    _fetchData = async (uri="") => {// obter dados
        let response = null;// response
        try{// tenta
            response = await axios(AMIIBO_URL_ENDPOINT + uri);// obtém os dados
        }catch (e){// se der erro
            return null;// retorna null
        }
        return response;// retorna os dados
    }
}