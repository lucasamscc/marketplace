<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once 'conexao.php';


$query_produtos = "SELECT codigo, pedido, produto, quantidade, total FROM produto_pedido  WHERE pedido=1 ORDER BY pedido ASC";
$result_produtos = $conn->prepare($query_produtos);
$result_produtos->execute();

if (($result_produtos) and ($result_produtos->rowCount() != 0)) {
    while ($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_produto);

        $lista_produtos["records"][$codigo] = [
            'codigo' => $codigo,
            'pedido' => $pedido,
            'produto' => $produto,
            'quantidade' => $quantidade,
            'total' => $total
        ];
    }
    //resposya com status 200
    http_response_code(200);

    //retornar cos produtos em formato json
    echo json_encode($lista_produtos);
}

