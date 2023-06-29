import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './Editar.module.css'
import { useEffect } from "react";

export default function Editar(props){

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    
    const{codigo} = useParams();
    const[nome, setNome] = useState('');
    const[tipo, setTipo] = useState('');  
    const[valor, setValor] = useState('');
    
    const editarProduto = async e =>{
        e.preventDefault();
        console.log(nome);

        await fetch("http://localhost/crud/editar.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome, tipo, valor})
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.erro){
                setStatus({
                    type: 'error',
                    mensagem: responseJson.mensagem
                });
            }else{
                setStatus({
                    type: 'success',
                    mensagem: responseJson.mensagem
                });
            }
        }).catch(()=>{
            setStatus({
                type: 'error',
                mensagem: "Produto não editado com sucesso, tente mais tarde!"
            });
        });
    }

    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost/crud/visualizar.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setNome(responseJson.produto.nome);
                setTipo(responseJson.produto.tipo);
                setValor(responseJson.produto.valor);
            });
        }
        getProduto();
    },[codigo])

    function removeSpaces(input) {
        input.value = input.value.trim();
      }
    return(
        <div>

            <h1 className={styles.estiloTitulo}>Editar </h1>
            {status.type === 'erro'? <p >{status.mensagem}</p> : ""}
            {status.type === 'success'? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}
            <form className={styles.editarP} onSubmit={editarProduto}>
                <label>Nome: </label>
                <input 
                type="text" 
                name="nome"  
                placeholder="Insira o nome do produto"
                onBlur={(event) => removeSpaces(event.target)} 
                value={nome} 
                pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                required
                onChange={e => setNome(e.target.value)}
                /> 

                <label>Tipo: </label>
                <input 
                type="number"
                name="tipo" 
                placeholder="Insira o tipo do produto" 
                value={tipo} 
                onChange={e => setTipo(e.target.value)} 
                pattern="[0-9]+$"
                />

                <label>Valor:</label>
                <input 
                type="number" 
                name="valor" 
                placeholder="Insira o valor do produto" 
                value={valor} 
                onChange={e => setValor(e.target.value)} 
                pattern="[0-9]+$"
                min={1}
                max={99}
                /> 

                <input type="submit"/>
            </form>
            <Link className={styles.btnVoltar} to={'/produtos'}>Voltar</Link>
        </div>
    )
}