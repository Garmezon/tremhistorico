let PontoPartida = document.getElementById('destino-inicial');
    PontoPartida.addEventListener("selectstart", getEstacao()); 

    let PontoDestino = document.getElementById('destino-destino');
    PontoDestino.addEventListener("selectstart", getEstacao()); 
    
    

    function getEstacao(){
        fetch('../api/rotas/entregaViagem.php?a=partida')
        .then(response => response.json())
        .then(data => {


        let seletorGerado = document.querySelectorAll('#gerado');
        
        seletorGerado.forEach(estacao =>{
                estacao.remove()
        }
            );

        // -------------------------------------------
        
        data.forEach(element => {

        let viagem = element.viagem;
        let id = element.id;
        // pega do backend as estacoes disponives
    
        let opcao = document.createElement("option");
        opcao.setAttribute("value",id);
        opcao.setAttribute("id","gerado");
            
        opcao.textContent = viagem;

        PontoPartida.appendChild(opcao);
        PontoDestino.appendChild(opcao.cloneNode(true));
        // clone node copia a opcao para dar um append nela duas vezes
        // De resto cria um objeto option pra colocar no seletor para fazer a selecao da viagem
        });
        }) 
        .catch(error => console.error('Erro:', error));


    }


    function getViagens(){

            let inicial = PontoPartida.value; let final = PontoDestino.value;
            // pegamos o valor que o usuario selecionou

            let formViagem = new FormData;
            // criamos uma formdata para colocar esses dados dentro

            formViagem.append('viagens', inicial);
            
            formViagem.append('viagens-destino',final);

            // colocamos o dado dentro utilizando um append
            
            fetch('../api/rotas/entregaViagem.php?a=selecaousuario', {
                method: "POST",
                body: formViagem
            })
            .then(response => response.json())
            .then(data => {

                    
                    let seletorGeradoCaixa = document.querySelectorAll('.gerado-caixa-viagem');
                    seletorGeradoCaixa.forEach(viagem=>{
                            viagem.remove()
                    }
                    );

                    // -------------------------------------------
                if(data != null){
                data.forEach(element => {
                    let viagem_DataTime = element.data;
                    let viagem_valor = element.valor;
                    let viagem_quantidade_assentos = element.quantidade_assentos; 
                    let viagem_id = element.id;

                    let viagens_display_caixa = document.getElementById("viagem-caixa");
                    let caixa_viagem = document.createElement("div");

                    let caixa_dentro = document.createElement("p");
                    let caixa_dentro_1 = document.createElement("p")
                    let caixa_dentro_2 = document.createElement("p")

                    let botao_caixa = document.createElement("button");
                    let botao_cancelar = document.createElement("button");

                    botao_cancelar.innerText = "Cancelar viagem"
                    botao_caixa.innerText = "Agendar viagem";

                    botao_cancelar.setAttribute("onclick",`cancelarViagem(${viagem_id})`);

                    botao_caixa.setAttribute("onclick",`agendarViagem(${viagem_id})`);

                    botao_caixa.setAttribute("class","botao pequeno");
                    botao_cancelar.setAttribute("class","botao pequeno");

                    caixa_dentro.innerText = `data: ${viagem_DataTime} `;
                    caixa_dentro_1.innerText =  `valor: ${viagem_valor} Reais`
                    caixa_dentro_2.innerText = `passagens disponiveis: ${viagem_quantidade_assentos}`

                    caixa_viagem.appendChild(caixa_dentro);
                    caixa_viagem.appendChild(caixa_dentro_1);
                    caixa_viagem.appendChild(caixa_dentro_2);

                    caixa_viagem.appendChild(botao_caixa);
                    caixa_viagem.appendChild(botao_cancelar);

                    caixa_viagem.setAttribute('class','gerado-caixa-viagem');

                    viagens_display_caixa.appendChild(caixa_viagem);

                    
                })
                } else {
                    let viagens_display_caixa = document.getElementById("viagem-caixa");
                    let caixa_erro= document.createElement("p");
                    caixa_erro.innerText = "Não existe rotas disponiveis com essa configuração";
                    caixa_erro.setAttribute('class','gerado-caixa-viagem');
                    caixa_erro.setAttribute('id','gerado-caixa-erro')
                    viagens_display_caixa.appendChild(caixa_erro);
                }
            })
            .catch(error => console.error('Erro:',error));

        }

        function agendarViagem(id){

            formID= new FormData;

            formID.append('ID_VIAGEM', id);

            fetch("../api/rotas/AgendarViagem.php?a=agendarviagemUser", {
                method: "POST",
                body: formID 
            })
            .then(response => response.json())
            .then(data => CheckErro(data))
            .catch(error => console.error('Erro: ', error));

        }

        
        function cancelarViagem(id){

            // Cancela a viagem
            fetch(`../api/rotas/AgendarViagem.php?a=cancelarviagemUser&d=${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => CheckErro(data))
            .catch(error => console.error('Erro: ', error));

        }