<?php

$conn = mysqli_connect("localhost:3306","root","","trem_historico");

$acao = $_GET['a'] ? '' 

if($acao === "agendarviagemUser"){
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $id_viagem = $_POST['ID_VIAGEM'];
        $id_usuario = isset($_SESSION["ID_USUARIO"]) ? $_SESSION["ID_USUARIO"] : NULL ;

        if($id_viagem == NULL){
            die("Botão definido de forma errada. Sem ID de viagem");
        }

        if($id_usuario != NULL){
            // ... 
        }
        else{

            $obj = [
                'sql' => FALSE,
                'numeroCode' => '-1',
                'erro' =>  'Você não está logado'
            ];

            echo $obj;
        }


    }
}

?>