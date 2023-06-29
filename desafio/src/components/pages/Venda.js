import React from "react";
import styles from "./Venda.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Venda(){
  
  // lista de produtos
  const [data, setData] = useState([]);

  // campo de valor
  const [valorProduto, setValorProduto] = useState('');

  // campo total
  const [total, setTotal]= useState(0);

  // campo quantidade
  const [quantidade, setQuantidade] = useState(0);

  // campo produto selecionado
  const [produto, setProduto] = useState();

  // imposto
  const [imposto,setImposto] = useState([]);

  /*Recebendo os produtos para ser usado no <select> Produto */
  const getProdutos = async() => {
    fetch("http://localhost/crud/listaProdutos.php")
    .then((response) => response.json())
    .then((responseJson) => (
      setData(responseJson.records)
    ));
  }
  useEffect(() => {
    getProdutos();
  }, []);


  const valorImposto = () =>{
    cupomFiscal.forEach(imposto => {
      
    });
  }
/*Receber os valores dos impostos */
  const getImposto = async(codigo) => {
    fetch("http://localhost/crud/tiposProdutos.php?codigo=" + codigo)
    .then((response) => response.json())
    .then((responseJson) => (
      setImposto(responseJson.records)
    ))
  }
  useEffect(() =>{
    getImposto();
  }, []);
  /*Implementação do Status */
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })
  console.log(status);

  /*Implementando o pedido */
  const [pedido, setPedido] = useState({
    nome: '',
    pedido: '',
    produto: produto,
    quantidade: quantidade,
    total: total,
    impostoTotal: imposto
  });

/* Lista de pedidos (cupom fiscal) -> adiciono os pedidos ao cupom */
  const [cupomFiscal, setCupomFiscal] = useState([]);
  const adicionarPedidoAoCupom = (e) => {
    e.preventDefault();
    setCupomFiscal([...cupomFiscal, pedido]);
  }
  const ImpostoEstimado = cupomFiscal.reduce(getImpostoEstimado, 0);
  function getImpostoEstimado(valorTotal, item){
    return valorTotal + (item.total) + (item.impostoTotal) - (item.total);
  }
/*Cálculo do valor total (sem imposto ainda) */
  const valorTotal = cupomFiscal.reduce(getTotalVenda, 0);
  function getTotalVenda(valorTotal, item){
    return valorTotal + (item.total) + (item.impostoTotal);
  }
/* Concluir a venda  */
 const enviarVenda = async(e) =>{
    e.preventDefault();

   const final = {
    cupom: cupomFiscal,
    tot: valorTotal
   }
    
    await fetch("http://localhost/crud/cadastrarPedido.php", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(final) // enviando os dados que estão na constante pedido
    }, [])
      .then((response)=> response.json()) // resposta em formato json // coloquei text pq estava caindo em erro a mensagem -> !!!verificar!!!
      //.then(() => {window.location.reload();})
      
      .then((responseJson) => {
     
      console.log("teste1:",responseJson);
        if (responseJson.erro){
          setStatus({
            type: 'erro',
            mensagem: responseJson.mensagem
          });
        }else{ 
          setStatus({
            type: 'success',
            mensagem: responseJson.mensagem
          });
          }
      }).catch(() => {
          setStatus({
              type: 'erro',
              mensagem: 'Não foi possivel incluir o pedido. Tente mais tarde'
          })
      })
      .then(()=>{
        window.location.reload(5);
      })

    }
    
    //console.log("JSON enviado RELATORIO: ", JSON.stringify(valorTotal));
   // console.log("JSON enviado VENDA: ", JSON.stringify({cupomFiscal}));

  useEffect(() => {
    if (!produto) {
      return;
    }
    fetch("http://localhost/crud/visualizar.php?codigo=" + produto)
    .then((response) => response.json())
    .then((responseJson) => {
      const codigoProd = responseJson.produto.codigo;
      const valorProd = responseJson.produto.valor;
      const newTotal = quantidade * valorProd;
      const nome = responseJson.produto.nome;
      const imposto = responseJson.produto.imposto;
     
      setPedido({
        ...pedido,
        nome: nome,
        pedido: '',
        produto: codigoProd,
        quantidade: quantidade,
        total: newTotal,
        impostoTotal: imposto * newTotal/100
      });
      setTotal(newTotal);
      setValorProduto(valorProd);
      
    })
  }, [quantidade, produto]);

  return (
    <div className={styles.containerVendas}>
    <section>
      {status.type === 'erro'? <p className={styles.AlertDanger}>{status.mensagem}</p> : ""}
      {status.type === 'success'? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}
      <h1 className={styles.tituloVendas}>Incluir Produto</h1>
      <form onSubmit={adicionarPedidoAoCupom} > 
      
        <div className={styles.sozinhos}>
          <label>Produto</label>
            <select 
              name="produto" 
              onChange={(e) => {
                setProduto(e.target.value) 
                
                }} >
                  <option key={0}>Selecione um produto</option>
                {Object.values(data).map(produto => (
                  <option 
                    key={produto.codigo} 
                    value={produto.codigo}> 
                  {produto.codigo}. {produto.nome} 
                  </option>
                ))}
            </select> 
        </div>
        <div className={styles.inline}>
          <label>Quantidade</label>  
          <input 
            type="number" 
            name="quantidade" 
            defaultValue={0} 
            min={1} 
            max={99}
            onChange={ (e) => setQuantidade(e.target.value)} />
          <label >Valor un.</label>
          <input  
            name="valor" 
            type="number" 
            readOnly 
            value={valorProduto}
            disabled
          />
          <label>Total</label>
          <input 
            type="number" 
            name="total" 
            value={total}
            disabled
          />
                        
        </div>
        <input 
            className={styles.btnVenda}
            type="submit" 
            value="Incluir" 
          /> 
      </form>
      </section>
      <aside>
        <h1 className={styles.tituloVendas}>Cupom Fiscal</h1>
        <table className={styles.cupomFiscal}>
            <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                </tr>
            </thead>
            <tbody>
            {cupomFiscal.map((item, index) => (
              <tr key={index}>
                <td>{item.produto} - {item.nome}</td>
                <td>{item.quantidade}</td>
                <td>{item.total}</td>
              </tr>
            ))} 
            </tbody>
          </table>
          <table className={styles.cupomFiscal}>
            <thead>
              <tr>
                <th>Imposto Estimado</th>
                <th>R$ {ImpostoEstimado.toFixed(2).toString()}</th>
              </tr>
            </thead>
          </table>
          <table className={styles.cupomFiscal}>
            <thead>
              <tr>
                <th>Valor Total</th>
                <th>R$ {valorTotal.toString()}</th>
              </tr>
            </thead>
          </table>

        <input className={styles.btnVenda} type="submit" value="Concluir pedido" onClick={enviarVenda}/>
      </aside>
    </div>
  );
}
