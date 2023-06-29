import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from './EditarTipo.module.css'
import { useEffect } from "react";

export default function Editar(props){

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    
    const{codigo} = useParams();
    const[nome, setNome] = useState('');
    const[percentual_imposto, setPercentual_imposto] = useState('');  
    
    const EditarTipo = async e =>{
        e.preventDefault();
        console.log(nome);

        await fetch("http://localhost/crud/editarTipo.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({codigo, nome,percentual_imposto})
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
                mensagem: "Tipo não editado com sucesso, tente mais tarde!"
            });
        });
    }

    useEffect(() => {
        const getPercentual_imposto = async () =>{
            await fetch("http://localhost/crud/visualizarTipo.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setNome(responseJson.tipo_produto.nome);
                setPercentual_imposto(responseJson.tipo_produto.percentual_imposto);
            });
        }
        getPercentual_imposto();
    },[codigo])


    function removeSpaces(input) {
        input.value = input.value.trim();
      }
    return(
        <div>

            <h1 className={styles.estiloTitulo}>Editar </h1>
            {status.type === 'erro'? <p >{status.mensagem}</p> : ""}
            {status.type === 'success'? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}
            <form className={styles.editarT} onSubmit={EditarTipo}>
                <label>Nome: </label>
                <input 
                type="text" 
                name="nome"  
                placeholder="Insira o nome do tipo_produto"
                onBlur={(event) => removeSpaces(event.target)}
                value={nome} 
                onChange={e => setNome(e.target.value)}
                required
                pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                />
                <label>% Imposto: </label>
                <input 
                type="number" 
                name="valor" 
                required 
                placeholder="Insira o Percentual do Imposto"
                value={percentual_imposto} 
                onChange={e => setPercentual_imposto(e.target.value)}
                pattern="[0-9]+$"
                min={1}
                max={99}
                /> 
                <input type="submit"/>
            </form>
            <Link className={styles.btnVoltar} to={'/Tipos'}>Voltar</Link>
        </div>
    )
}