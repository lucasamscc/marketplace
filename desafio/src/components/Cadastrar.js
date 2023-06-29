import React from "react";
import { Link } from "react-router-dom";
import styles from './Cadastrar.module.css'
import { useState } from "react";
import { useEffect } from "react";

export default function Cadastrar() {

/*implementação status */
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const [produto, setProduto] = useState({
        nome: '',
        tipo: '',
        valor: ''
    });
    const [tipo, setTipo] = useState([]);
    const [data,setData] = useState([]);
    const getTipo = async() => {
        fetch("http://localhost/crud/tiposProdutos.php")
        .then((response) => response.json())
        .then((responseJson) => (
          setData(responseJson.records)
        ));
      }

      useEffect(() => {
        getTipo();
      }, []);
    
    const valorInput = e => setProduto(
        {
            ...produto, [e.target.name]:e.target.value
        });

    
          
    const cadProduto = async e =>{
        e.preventDefault(); 
        //console.log(produto.nome);
        

// --------------- realizando a conexão do front com o backend ---------------
    await fetch("http://localhost/crud/cadastrar.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({produto}) // enviando os dados que estão na constante produto
        })
        .then((response)=> response.json()) // resposta em formato json
        .then((responseJson) => {
            //console.log(responseJson)
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
                mensagem: 'Produto não cadastrado. Tente mais tarde'
            })
        })
    }
    function removeSpaces(input) {
        input.value = input.value.trim();
      }
      

    return (
        <section className={styles.cadastro}>
            <div>
            <h1 className={styles.cadastrar}>Cadastrar</h1>
            
            {status.type === 'erro'? <p className={styles.AlertDanger}>{status.mensagem}</p> : ""}
            {status.type === 'success'? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}

            <form className={styles.formularioCad} onSubmit={cadProduto}>
                <label>Nome: </label>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Insira o nome do produto" 
                    onBlur={(event) => removeSpaces(event.target)}
                    required
                    onChange={valorInput}
                    pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                /> 

                <label>Tipo: </label>
                <select 
                    name="tipo" 
                    onChange={(e) => {
                        setTipo(e.target.value) 
                        
                        }} >
                        <option key={0}>Selecione um tipo</option>
                        {Object.values(data).map(produto => (
                        <option 
                            key={produto.codigo} 
                            value={produto.codigo}> 
                        {produto.codigo}. {produto.nome} 
                        </option>
                ))}
            </select>
                <label>Valor:</label>
                <input 
                    type="number" 
                    name="valor" 
                    min={1} 
                    required placeholder="Insira o valor do produto" 
                    onChange={valorInput}
                    pattern="[0-9]+$"
                /> 
                <input type="submit"/>
            </form>
            <Link className={styles.btnVoltar} to={'/produtos'}>Voltar</Link>
        </div>
        </section>
        
    )
}