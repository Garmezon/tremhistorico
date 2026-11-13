
function UsuarioNome(){

    fetch("../../api/usuario/usuarioOp.php?a=RetornarNomeUsuario")
    .then(response => response.json())
    .then(data => {
        let visitante = document.getElementById("nome-usuario");
        visitante.innerText = data;
    });

}

UsuarioNome()