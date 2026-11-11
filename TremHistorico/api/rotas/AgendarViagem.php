<?php

$conn = mysqli_connect("localhost:3306","root","","trem_historico");

$acao = $_GET['a'] ?? '';

if($acao === "agendarviagemUser"){
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $id_viagem = $_POST["ID_VIAGEM"];
        $id_usuario = isset($_SESSION["ID_USUARIO"]) ? $_SESSION["ID_USUARIO"] : NULL;

        if($id_viagem == NULL){
            die("Botão definido de forma errada. Sem ID de viagem");
        }

        if($id_usuario != NULL){
            $conn->prepare("INSERT INTO viagem_usuario (id_usuario, id_viagem) VALUES (? , ?) ");
            $conn->bind_param("ii", $id_usuario, $id_viagem);
            $conn->execute();
            
            $obj = [
                'sql' => TRUE,
                'numeroCode' => $query->errno,
                'erro' =>  $query->error
            ];

        }
        else{

            $obj = [
                'sql' => FALSE,
                'numeroCode' => '-1',
                'erro' =>  'Você não está logado'
            ];

            
        }

        echo json_encode($obj);

    }
}
else if ($acao === "cancelarviagemUser"){
    if($_SERVER['REQUEST_METHOD'] == "DELETE"){
 
        $id_viagem = $_GET['d'] ?? NULL;
        $id_usuario = isset($_SESSION["ID_USUARIO"]) ? $_SESSION["ID_USUARIO"] : NULL;

        if($id_viagem == NULL){
            die("Botão definido de forma errada. Sem ID de viagem");
        }

        if($id_usuario != NULL){

            $conn->prepare("DELETE FROM viagem_usuario WHERE id_usuario = ?  AND id_viagem = ?");
            $conn->bind_param("ii", $id_usuario, $id_viagem);
            $conn->execute();



            $obj = [
                'sql' => TRUE,
                'numeroCode' => $query->errno,
                'erro' =>  $query->error
            ];
        }
        else{

            $obj = [
                'sql' => FALSE,
                'numeroCode' => '-1',
                'erro' =>  'Você não está logado'
            ];
        }

        echo json_encode($obj);
    }

}

?>