<?php
/*
 Este é um script PHP que tem como objetivo retornar informações de um tipo_produto em formato JSON com base no código de tipo_produto fornecido. Vou explicar as partes do código em detalhes:
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset-UTF8");

include_once 'conexao.php';

/*
  Essa linha obtém o código do tipo_produto enviado por meio de uma solicitação GET e usa a função filter_input para garantir que apenas números inteiros sejam aceitos
*/

$codigo = filter_input(INPUT_GET, 'codigo', FILTER_SANITIZE_NUMBER_INT);
$response = "";

/*
  O comando prepare é usado para preparar a consulta e evitar ataques de injeção de SQL. O método bindParam é usado para atribuir o valor do código à variável nomeada ":codigo". Finalmente, a consulta é executada com o método execute.
*/

$query_tipo = "SELECT codigo, nome, percentual_imposto FROM tipo_produto WHERE codigo=:codigo      LIMIT 1";
$result_tipo = $conn->prepare($query_tipo);
$result_tipo->bindParam(':codigo', $codigo, PDO::PARAM_INT);
$result_tipo->execute();

/*
  verifica se a consulta SQL retornou pelo menos um resultado. Se houver, as informações do tipo_produto são extraídas do resultado e armazenadas em um array associativo chamado $tipo_produto. 
*/
if (($result_tipo) and ($result_tipo->rowCount() != 0)) {
  $row_tipo = $result_tipo->fetch(PDO::FETCH_ASSOC);
  extract($row_tipo);
  $tipo_produto = [
    'codigo' => $codigo,
    'nome' => $nome,
    'percentual_imposto' => $percentual_imposto
  ];
  $response = [
    "erro" => false,
    "tipo_produto" => $tipo_produto
  ];
} else {
  $response = [
    "erro" => true,
    "mensagem" => "Tipo não encontrado"
  ];
}
http_response_code(200);
echo json_encode($response);
