<?php
// -67 => Email nao esta formatado corretamente

$conn = mysqli_connect("localhost:3306","root","","trem_historico");

$acao_usuario = $_GET['a'] ?? '';

function iniciarSessao($id_usuario, $nomeusuario){
    
    session_start();
    session_regenerate_id(true);

    $_SESSION['ID_USUARIO'] = $id_usuario;
    $_SESSION['nomeusuario'] = $nomeusuario;

}

function VerificarUsuario($email_vef, $senha_ver){

    global $conn;

    $ID_usuario = '';
    $Nome_usuario = '';

    $queryEmail = $conn->prepare('SELECT id, nome FROM usuario WHERE email = ? AND senha = ?;');

    $queryEmail->bind_param("ss",$email_vef, $senha_ver);
    $queryEmail->execute();

    $queryEmail->store_result();
    $queryEmail->bind_result($ID_usuario, $Nome_usuario);
    $queryEmail->fetch();
    



    if($queryEmail->num_rows > 0 )
    {
        // O email eh unico, logo por simplicidade confiamos que se encontrar um registro com esse email vai ser apenas um. 

        $obj = [
            'numeroCode' => '0',
            'ID' => $ID_usuario,
            'Nome' => $Nome_usuario
        ];

    }   
    else{

        $obj = [
            'sql' => FALSE,
            'numeroCode' => '-68',
            'erro' =>  'Não existe registro com esse email e senha.'
        ];

    
    }

    return $obj;
}

// ==========================================================================================================

if($acao_usuario === 'cadastro'){

    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
        $nome = $_POST['nome'];
        $cpf = $_POST['cpf'];
        $email = $_POST['email'];
        $numero_celular = $_POST['numero_celular'];
        $senha = $_POST['senha'];

        // Antes de tentar escrever no banco de dados verifica se o email eh valido.

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                
             $obj = [
            'sql' => FALSE,
            'numeroCode' => '-67',
            'erro' =>  'o Email não está formatado corretamente'
                ];
            echo json_encode($obj);
            die();
        }
    
        $query = $conn->prepare(
        'INSERT INTO usuario (nome, cpf, email, numero_celular, senha) VALUES (?, ?, ?, ?, ?);');
        $query->bind_param("sssss", $nome, $cpf, $email, $numero_celular, $senha);
        $query->execute();


        $obj = [
            'sql' => TRUE,
            'numeroCode' => $query->errno,
            'erro' =>  $query->error
        ];
        
        if($query->error === ""){
            //Nenhum erro no mysql

            $v = VerificarUsuario($email, $senha);

            if($v["numeroCode"] === "0"){
                iniciarSessao($v["ID"], $v["Nome"]);
            }
        }
        
        echo json_encode($obj);
    
        }
}
else if($acao_usuario === 'login'){
    if($_SERVER["REQUEST_METHOD"] == "POST"){

        if(!isset($_COOKIE["PHPSESSID"])){
                
            $email = $_POST['email'];
            $senha = $_POST['senha'];
                                                                                                                                                                               
            $p = VerificarUsuario($email, $senha);
              
            if($p["numeroCode"] === "0"){
                iniciarSessao($p["ID"], $p["Nome"]);
            }
        }
        else {
            $p = [
            'sql' => FALSE,
            'numeroCode' => '1',
            'erro' => "Você já está logado"
            ];
 
        }

        echo json_encode($p);


    }

}

?>