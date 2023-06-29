<?php
header("Access-Control-Allow-Origin: *"); // permitir o acesso
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once 'conexao.php';

$cod = filter_input(INPUT_GET, "codigo", FILTER_SANITIZE_NUMBER_INT);
$response = "";
$query_tipo = "DELETE FROM tipo_produto WHERE codigo=:codigo LIMIT 1";
$delete_tipo = $conn->prepare($query_tipo);
$delete_tipo->bindParam(':codigo', $cod, PDO::PARAM_INT);

if ($delete_tipo->execute()) {
    $response = [
        "erro" => false,
        "mensagem" => "Tipo apagado com sucesso! $cod"
    ];
} else {
    $response = [
        "erro" => true,
        "mensagem" => "Tipo não foi apagado"
    ];
}


http_response_code(200);
echo json_encode($response);
