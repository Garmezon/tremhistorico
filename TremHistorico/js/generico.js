    function CheckErro(json){
        if(json.numeroCode != 0){
            if(!json.sql){
                let errorNumero = ["-1", "1", "-67", "-68","-69"];
                let errorText = ["Você não está logado", "Você já está logado", "O email não é válido", "Não existe registro com esse email e senha", "A viagem não foi agendada"];

                const ChecarIgual = element => element == json.numeroCode;
                let indiceElemento = errorNumero.findIndex(ChecarIgual);

                console.log(json.numeroCode);
                console.log(errorText[indiceElemento],indiceElemento);

                CriarCaixaErro(errorText[indiceElemento]);
                
            }
            else{
                ErroSQL(json);
            }
        }
        else{
            SucessoMensagem(json);
        }
    }

    function Remover_ID(ID){
        let remover = document.getElementById(ID);
        remover.remove();
    }

    function SucessoMensagem(){
        let div = document.createElement('div');
        let p = document.createElement('p');
        let button = document.createElement('button');

        div.setAttribute('class','header sucesso');
        div.setAttribute('id','erro-box');

        p.innerText = "Operação realizada com sucesso";
        button.innerText = "Fechar";
        button.setAttribute("Onclick", 'Remover_ID("erro-box")');
        button.setAttribute("class","botao erro-botao");
        
        div.appendChild(p);
        div.appendChild(button);

        document.body.appendChild(div);
    }

    function CriarCaixaErro(text){
        let div = document.createElement('div');
        let p = document.createElement('p');
        let button = document.createElement('button');

        div.setAttribute('class','header erro');
        div.setAttribute('id','erro-box');

        p.innerText = text;
        button.innerText = "Fechar";
        button.setAttribute("Onclick", 'Remover_ID("erro-box")');
        
        button.setAttribute("class","botao erro-botao");
        
        div.appendChild(p);
        div.appendChild(button);

        document.body.appendChild(div);
    }

    function ErroSQL(json){
        let ErrorSQL = ['4025','1062']
        //CONSTRAINT CHECK, DUPLICATE ENTRY
        let ErroTexto = ["CPF ou Número de telefone inválido.","Você já fez essa ação"];

        const ChecarIgual = element => element == json.numeroCode;
        let indiceElemento = ErrorSQL.findIndex(ChecarIgual);
        CriarCaixaErro(ErroTexto[indiceElemento]);
    }

    function UsuarioNome(){

        fetch("../api/usuario/usuarioOp.php?a=RetornarNomeUsuario")
        .then(response => response.json())
        .then(data => {
            let visitante = document.getElementById("nome-usuario");
            visitante.innerText = data;
        });

    }

    
    function UsuarioNome_Usuario(){

        fetch("../../api/usuario/usuarioOp.php?a=RetornarNomeUsuario")
        .then(response => response.json())
        .then(data => {
            let visitante = document.getElementById("nome-usuario");
            visitante.innerText = data;
        });

    }

    