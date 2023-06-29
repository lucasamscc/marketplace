<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once 'conexao.php';

$query_relatorio = "SELECT `codigo`, `data`, `total` FROM pedido ORDER BY codigo ASC";


$result_relatorio = $conn->prepare($query_relatorio);
$result_relatorio->execute();

if (($result_relatorio) and ($result_relatorio->rowCount() != 0)) {
    while ($row_relatorio = $result_relatorio->fetch(PDO::FETCH_ASSOC)) {
        extract($row_relatorio);
        $lista_relatorio["records"][$codigo] = [
            'codigo' => $codigo,
            'data' => $data,
            'total' => $total
        ];
    }
    //resposya com status 200
    http_response_code(200);
    //retornar cos produtos em formato json
    echo json_encode($lista_relatorio);
}