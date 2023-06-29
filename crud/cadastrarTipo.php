<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// incluindo conexao
include_once 'conexao.php';
$response_json = file_get_contents("php://input");
$dados_tipo = json_decode($response_json, true);

// ---------- inserção de um novo registro na tabela --------------------------
// --------------- testado no insomnia e funcionando ------------
if ($dados_tipo) {
    $query_tipo = "INSERT INTO tipo_produto (nome, percentual_imposto) VALUES (:nome, :percentual_imposto)"; // fazendo apenas um link para o valor
    $cad_tipo = $conn->prepare($query_tipo);
    $cad_tipo->bindParam(':nome', $dados_tipo['tipo_produto']['nome']);
    $cad_tipo->bindParam(':percentual_imposto', $dados_tipo['tipo_produto']['percentual_imposto']);
    $cad_tipo->execute();

    if ($cad_tipo->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "Tipo cadastrado com sucesso"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "não foi possivel cadastrar o Tipo"
        ];
    }
} else {
    $response = [
        "erro" => true,
        "mensagem" => "não foi possivel cadastrar o Tipo"
    ];
}
http_response_code(200);
echo json_encode($response);
