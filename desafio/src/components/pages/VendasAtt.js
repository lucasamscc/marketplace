import React from "react"
import { useState } from "react";

export default function VendasAtt(){

/*Implementação do Status */
const [status, setStatus] = useState({
type: "",
mensagem: "",
});

/*Implementando a constante pedido */
const [pedido, setPedido] = useState({
pedido: "",
produto: "",
quantidade: "",
total: "",
});

const cadPedido = async (e) => {
    e.preventDefault();

/* Conexão do front com o back para incluir o pedido no cupom fiscal*/
await fetch("http://localhost/crud/cadastrarPedido.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ pedido }), // enviando os dados que estão na constante pedido
  })
    .then((response) => response.json()) // resposta em formato json
    .then((responseJson) => {
      //console.log(responseJson)
      if (responseJson.erro) {
        setStatus({
          type: "erro",
          mensagem: responseJson.mensagem,
        });
      } else {
        setStatus({
          type: "success",
          mensagem: responseJson.mensagem,
        });
      }
    })
    .catch(() => {
      setStatus({
        type: "erro",
        mensagem: "Produto não cadastrado com sucesso. Tente mais tarde",
      });
    });
};

    return (
        <div>
            <h1></h1>
            <form action="">
                <label>Produto</label>
                <select 
                    name="produto"
                ></select>
                <label>Quantidade</label>
                <input
                    type="number"
                    min={0}
                />
                <label>Valor Un.</label>
                <input
                type="number"
                disabled
                />
                <label>Total</label>
                <input 
                type="number"
                disabled
                />
            </form>
        </div>
    )
}