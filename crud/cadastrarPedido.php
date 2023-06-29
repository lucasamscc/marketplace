<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// incluindo conexao
include_once 'conexao.php';
$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);


/* corrigindo a data e horario para ser enviada ao relatório */
date_default_timezone_set('America/Sao_Paulo');
$data = date('d-m-Y h:i:s A');
$data_obj = date_create_from_format('d-m-Y h:i:s A', $data);
$data_formatada = $data_obj->format('Y-m-d H:i:s');


/*Inserção no relatório */
if ($dados) {
    $query_relatorio = "INSERT INTO pedido (data,total) VALUES (:data,:total)";
    $cad_relatorio = $conn->prepare($query_relatorio);
    $cad_relatorio->bindParam(':data', $data_formatada);
    $cad_relatorio->bindParam(':total', $dados['tot']);
    $cad_relatorio->execute();
}

// buscando o numero do ultimo pedido inserido 
$codigoPedido = $conn->lastInsertId();

if ($dados) {
    foreach ($dados['cupom'] as $dado) {
        $query_pedido = "INSERT INTO produto_pedido (pedido, produto, quantidade, total) VALUES (:pedido, :produto, :quantidade, :total)";
        $cad_pedido = $conn->prepare($query_pedido);
        $cad_pedido->bindParam(':pedido', $codigoPedido);
        $cad_pedido->bindParam(':produto', $dado['produto']);
        $cad_pedido->bindParam(':quantidade', $dado['quantidade']);
        $cad_pedido->bindParam(':total', $dado['total']);
        $cad_pedido->execute();
    }

    if ($cad_pedido->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "pedidos cadastrados com sucesso"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "não foi possivel cadastrar os pedidos"

        ];
    }
} else {
    $response = [
        "erro" => true,
        "mensagem" => "não foi possivel cadastrar os pedidos"
    ];
}

http_response_code(200);
echo json_encode($dados);