<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");
header("Access-Control-Allow-Headers: *");

// incluindo conexao
include_once 'conexao.php';

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

if ($dados) {
    $query_tipo = "UPDATE tipo_produto SET nome=:nome, percentual_imposto=:percentual_imposto WHERE codigo=:codigo";
    $edit_tipo = $conn->prepare($query_tipo);
    $edit_tipo->bindParam(':codigo', $dados['codigo'], PDO::PARAM_INT);
    $edit_tipo->bindParam(':nome', $dados['nome'], PDO::PARAM_STR);
    $edit_tipo->bindParam(':percentual_imposto', $dados['percentual_imposto'], PDO::PARAM_INT);

    $edit_tipo->execute();
    if ($edit_tipo->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "Tipo editado com sucesso"
        ];
    } else {
        $response = [
            "erro" => false,
            "mensagem" => "Tipo não editado com sucesso",
        ];
    }
} else {
    $response = [
        "erro" => false,
        "mensagem" => "Tipo não editado com sucesso",
    ];
}


http_response_code(200);
echo json_encode($response);
