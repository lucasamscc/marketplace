<?php

//cabecalho obrigatorio
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

// incluindo conexao
include_once 'conexao.php';

//$query_produtos = "SELECT p.codigo, p.nome, p.valor, p.tipo FROM produto p ORDER BY codigo ASC";
$query_produtos = "SELECT p.codigo, p.nome, p.valor, t.nome AS tipo
                    FROM produto p
                    JOIN tipo_produto t ON p.tipo = t.codigo
                    ORDER BY p.codigo ASC";



$result_produtos = $conn->prepare($query_produtos);
$result_produtos->execute();

if (($result_produtos) and ($result_produtos->rowCount() != 0)) {
    while ($row_produto = $result_produtos->fetch(PDO::FETCH_ASSOC)) {
        extract($row_produto);

        $lista_produtos["records"][$codigo] = [
            'codigo' => $codigo,
            'nome' => $nome,
            'valor' => $valor,
            'tipo' => $tipo
        ];
    }
    //resposya com status 200
    http_response_code(200);

    //retornar cos produtos em formato json
    echo json_encode($lista_produtos);
}