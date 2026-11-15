// Cadastro - false
// Login - true

const CADASTRO = false;
const LOGIN = true;


function EnviarInformacaoUsuario(tipo){
    

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let UsuarioInformacoes = new FormData;
    
    if(tipo == CADASTRO){
        let cpf = document.getElementById('CPF').value;
        let numerocelular = document.getElementById('numerocelular').value;
        let senha = document.getElementById('senha').value;
        let nome = document.getElementById('nome').value;
        
        UsuarioInformacoes.append('nome',nome);
        UsuarioInformacoes.append('cpf',cpf);
        UsuarioInformacoes.append('email',email);
        UsuarioInformacoes.append('numero_celular',numerocelular);
        UsuarioInformacoes.append('senha',senha);
    }    
    if(tipo == LOGIN){
        UsuarioInformacoes.append('email',email);
        UsuarioInformacoes.append('senha',senha);
    }

    let urlGet = tipo == LOGIN ? 'login' : 'cadastro'; 
    
    fetch(`../../api/usuario/usuarioOp.php?a=${urlGet}`,{
        method: "POST",
        body: UsuarioInformacoes
    })
    .then(response => response.json())
    .then(data => {
        CheckErro(data);
    })
    .catch(error =>  console.error('Erro:',error));

    

}
