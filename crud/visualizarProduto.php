<?php
/*
 Este é um script PHP que tem como objetivo retornar informações de um produto em formato JSON com base no código de produto fornecido. Vou explicar as partes do código em detalhes:
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

include_once 'conexao.php';

/*
  Essa linha obtém o código do produto enviado por meio de uma solicitação GET e usa a função filter_input para garantir que apenas números inteiros sejam aceitos
*/
$codigo = filter_input(INPUT_GET, 'codigo', FILTER_SANITIZE_NUMBER_INT); 
$response = "";

/*
  O comando prepare é usado para preparar a consulta e evitar ataques de injeção de SQL. O método bindParam é usado para atribuir o valor do código à variável nomeada ":codigo". Finalmente, a consulta é executada com o método execute.
*/


$query_produto = "SELECT p.codigo, p.nome, p.valor, t.nome AS tipo
                    FROM produto p
                    JOIN tipo_produto t ON p.tipo = t.codigo
                    ORDER BY p.codigo limit 1";


$result_produto = $conn->prepare($query_produto);
$result_produto->bindParam(':codigo', $codigo, PDO::PARAM_INT);
$result_produto->execute();

/*
  verifica se a consulta SQL retornou pelo menos um resultado. Se houver, as informações do produto são extraídas do resultado e armazenadas em um array associativo chamado $produto. 
*/
if (($result_produto) and ($result_produto->rowCount() != 0)) {
  $row_produto = $result_produto->fetch(PDO::FETCH_ASSOC);
  extract($row_produto);
  $produto = [
    'codigo' => $codigo,
    'nome' => $nome,
    'tipo' => $tipo,
    'valor' => $valor
  ];
  $response = [
    "erro" => false,
    "produto" => $produto
  ];
} else {
  $response = [
    "erro" => true,
    "mensagem" => "produto não encontrado"
  ];
}
http_response_code(200);
echo json_encode($response);