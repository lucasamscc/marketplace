<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset-UTF8");
header("Access-Control-Allow-Methods: POST");


// incluindo conexao
include_once 'conexao.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);
date_default_timezone_set('America/Sao_Paulo');
$data = date('d-m-y h:i:s A');
$data_obj = date_create_from_format('d-m-y h:i:s A', $data);
$data_formatada = $data_obj->format('Y-m-d H:i:s');
// ---------- inserção de um novo registro na tabela --------------------------
if ($dados) {
    $query_pedido = "INSERT INTO pedido (data,total) VALUES (:data,:total)"; // fazendo apenas um link para o valor
    $cad_pedido = $conn->prepare($query_pedido);
    $cad_pedido->bindValue(':data', $data_formatada);
    $cad_pedido->bindParam(':total', $dados['total']);
    $cad_pedido->execute();
    if ($cad_pedido->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "pedido cadastrado com sucesso"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "não foi possivel cadastrar o pedido"
        ];
    }
} else {
    $response = [
        "erro" => true,
        "mensagem" => "não foi possivel cadastrar o pedido"
    ];
}
http_response_code(200);
//echo date_default_timezone_get(); - função ver qual fuso estou
//echo ($data_formatada); - teste para ver se está aparecendo o horario correto
echo json_encode($response);
