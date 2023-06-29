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
$pedido = filter_input(INPUT_GET, 'pedido', FILTER_SANITIZE_NUMBER_INT); 
$response = "";

/*
  O comando prepare é usado para preparar a consulta e evitar ataques de injeção de SQL. O método bindParam é usado para atribuir o valor do código à variável nomeada ":pedido". Finalmente, a consulta é executada com o método execute.
*/


$query_produto = "SELECT pp.codigo as codigo, pp.pedido as pedido, pp.produto as produto, pp.quantidade as quantidade, pp.total as total, p.nome as nome from produto_pedido as pp inner Join produto as p on p.codigo = pp.produto WHERE pedido =:pedido";



$result_produto = $conn->prepare($query_produto);
$result_produto->bindParam(':pedido', $pedido, PDO::PARAM_INT);
$result_produto->execute();

if (($result_produto) and ($result_produto->rowCount() != 0)) {
  $pedidos = array();
  while ($row_produto = $result_produto->fetch(PDO::FETCH_ASSOC)) {
    extract($row_produto);
    $pedido = [
      'pedido' => $pedido,
      'produto' => $produto,
      'quantidade' => $quantidade,
      'nome' => $nome,
      'total' => $total
    ];
    array_push($pedidos, $pedido);
  }
  $response = [
    "erro" => false,
    "pedidos" => $pedidos
  ];
} else {
  $response = [
    "erro" => true,
    "mensagem" => "pedido não encontrado"
  ];
}

http_response_code(200);
echo json_encode($response);