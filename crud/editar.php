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
    $query_produto = "UPDATE produto SET nome=:nome, tipo=:tipo, valor=:valor WHERE codigo=:codigo";
    $edit_produto = $conn->prepare($query_produto);
    $edit_produto->bindParam(':codigo', $dados['codigo'], PDO::PARAM_INT);
    $edit_produto->bindParam(':nome', $dados['nome'], PDO::PARAM_STR);
    $edit_produto->bindParam(':tipo', $dados['tipo'], PDO::PARAM_INT);
    $edit_produto->bindParam(':valor', $dados['valor'], PDO::PARAM_INT);

    $edit_produto->execute();
    if ($edit_produto->rowCount()) {
        $response = [
            "erro" => false,
            "mensagem" => "produto editado com sucesso"
        ];
    } else {
        $response = [
            "erro" => false,
            "mensagem" => "Produto não editado com sucesso",
        ];
    }
} else {
    $response = [
        "erro" => false,
        "mensagem" => "Produto não editado com sucesso",
    ];
}


http_response_code(200);
echo json_encode($response);
