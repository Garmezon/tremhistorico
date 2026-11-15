
function UsuarioNome(){

    fetch("../../api/usuario/usuarioOp.php?a=RetornarNomeUsuario")
    .then(response => response.json())
    .then(data => {
        let visitante = document.getElementById("nome-usuario");
        visitante.innerText = data;
    });

}

UsuarioNome()



function logout(){
    fetch("../../api/usuario/usuarioOp.php?a=logout")
    .then(response => response.json())
    .then(data => {
        CheckErro(JSON.parse(data));
    });

}
