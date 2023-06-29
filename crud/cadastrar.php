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

// ---------- inserção de um novo registro na tabela --------------------------
// --------------- testado no insomnia e funcionando ------------
if ($dados) {
    $query_produto = "INSERT INTO produto (nome, valor,tipo) VALUES (:nome, :valor, :tipo)"; // fazendo apenas um link para o valor
    $cad_produto = $conn->prepare($query_produto);
    $cad_produto->bindParam(':nome', $dados['produto']['nome']);
    $cad_produto->bindParam(':tipo', $dados['produto']['tipo']);
    $cad_produto->bindParam(':valor', $dados['produto']['valor']);
    $cad_produto->execute();

    if ($cad_produto->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "produto cadastrado com sucesso"
        ];
    } else {
        $response = [
            "erro" => true,
            "mensagem" => "não foi possivel cadastrar o produto"
        ];
    }
} else {
    $response = [
        "erro" => true,
        "mensagem" => "não foi possivel cadastrar o produto"
    ];
}
http_response_code(200);
echo json_encode($response);
