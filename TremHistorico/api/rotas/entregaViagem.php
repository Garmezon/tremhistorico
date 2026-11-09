<?php

    $conn = mysqli_connect("localhost:3306","root","","trem_historico");

    $acao = $_GET['a'] ?? '';

    if($acao === 'selecaousuario'){
        if($_SERVER["REQUEST_METHOD"] == "POST"){

            $partida = $_POST['viagens'] ?? '-1';
            $destino = $_POST['viagens-destino'] ?? '-1';

            $idRota = -1;
        
            $query = $conn->prepare(
                'SELECT id FROM rota  WHERE id_entrada = ? AND id_saida = ?;'
            );
            $query->bind_param('ii', $partida, $destino);
            $query->execute();

            $query->bind_result($idRota);

            $query->store_result();

            $linhas = $query->num_rows;

            if($linhas > 0){
                while($query->fetch()){

                    $query_rota = "SELECT * FROM viagem WHERE id_rota = {$idRota}";
                    $viagem_result = mysqli_query($conn, $query_rota);

                    $rota_lista = array();

                    while($row_viagem = mysqli_fetch_assoc($viagem_result)){
                        $tremQuery = "SELECT trem.id, trem.nome, sum(v.quantidade_assentos) as quantidade_pessoas FROM trem 
                                inner join trem_maquinario as tm
                                on tm.id_trem = trem.id
                                inner join trem_vagao as tv
                                on tv.id_trem = trem.id
                                inner join vagao as v
                                on v.id = tv.id_vagao
                                GROUP BY trem.id
                                HAVING trem.id = {$row_viagem['id_trem']};";

                        $tremLinha = mysqli_query($conn, $tremQuery);
                        $tremColuna = mysqli_fetch_assoc($tremLinha);

                        $viagem_informacao =[
                            'id' => $row_viagem['id'],
                            'data' => $row_viagem['data_time'],
                            'valor' => $row_viagem['valor'],
                            'quantidade_assentos' => $tremColuna['quantidade_pessoas']
                        ];
                        $rota_lista[] = $viagem_informacao;
                    
                    }
                }
                echo json_encode($rota_lista);
                
            }
            else{
                echo json_encode(null);
                // nada
            }
            
        }
    }

    if($acao === 'partida'){

        $result = mysqli_query($conn,"select * from estacao;");

        $estacao_lista = array();

        while($row = mysqli_fetch_assoc($result)){

            $estacao = [
                'viagem' => $row['nome'],
                'id' => $row['id']
            ];
            $estacao_lista[] = $estacao; 
        }
        echo json_encode($estacao_lista);

    }


?>