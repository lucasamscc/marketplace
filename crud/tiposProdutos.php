<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once 'conexao.php';
$query_tipos = "SELECT codigo, nome, percentual_imposto FROM tipo_produto ORDER BY codigo ASC";
$result_tipos = $conn->prepare($query_tipos);
$result_tipos->execute();

if (($result_tipos) and ($result_tipos->rowCount() != 0)) {
    while ($row_tipo = $result_tipos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_tipo);

        $tipo_produtos["records"][$codigo] = [
            'codigo' => $codigo,
            'nome' => $nome,
            'percentual_imposto' => $percentual_imposto
        ];
    }
    //resposta com status 200
    http_response_code(200);

    //retornar cos produtos em formato json
    echo json_encode($tipo_produtos);
}
