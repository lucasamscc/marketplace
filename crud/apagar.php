<?php
header("Access-Control-Allow-Origin: *"); // permitir o acesso
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once './conexao.php';

$cod = filter_input(INPUT_GET, "codigo", FILTER_SANITIZE_NUMBER_INT);
$response = "";
$query_produto = "DELETE FROM produto WHERE codigo=:codigo LIMIT 1";
$delete_produto = $conn->prepare($query_produto);
$delete_produto->bindParam(':codigo', $cod, PDO::PARAM_INT);

if ($delete_produto->execute()) {
    $response = [
        "erro" => false,
        "mensagem" => "Produto apagado com sucesso! $cod"
    ];
} else {
    $response = [
        "erro" => true,
        "mensagem" => "Produto não foi apagado"
    ];
}


http_response_code(200);
echo json_encode($response);
