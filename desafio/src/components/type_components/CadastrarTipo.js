import React from "react";
import { Link } from "react-router-dom";
import styles from './CadastrarTipo.module.css'
import { useState } from "react";


export default function CadastrarTipo() {

    // ------------------------ implementando status---------------------------
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const [tipo_produto, setTipo] = useState({
        nome: '',
        percentual_imposto: ''
    });

    const valorInput = e => setTipo(
        {
            ...tipo_produto, [e.target.name]:e.target.value
        });

    const cadTipo = async e =>{
        e.preventDefault(); 
        console.log(tipo_produto.nome);
        console.log(tipo_produto.percentual_imposto);

// --------------- realizando a conexão do front com o backend ---------------
    await fetch("http://localhost/crud/cadastrarTipo.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({tipo_produto}) // enviando os dados que estão na constante produto

            

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
                mensagem: 'Tipo não cadastrado. Tente mais tarde'
            })
        })
    }
    function removeSpaces(input) {
        input.value = input.value.trim();
      }
// ------------------------------------------------------------------------
    return (
        <div>
            
        <h1 className={styles.cadastrar}>Cadastrar</h1>
        <section>
            
            {status.type === 'erro'? <p className={styles.AlertDanger}>{status.mensagem}</p> : ""}
            {status.type === 'success'? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}
            <form className={styles.formCad} onSubmit={cadTipo}>
                <label className={styles.lbl}>Nome: </label>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Insira o nome do Tipo" 
                    onBlur={(event) => removeSpaces(event.target)}
                    required
                    onChange={valorInput}
                    pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                /> <br/>
                <label className={styles.lbl}>Percentual Imposto:</label>
                <input 
                    className={styles.inp} 
                    type="number" 
                    min={1} 
                    max={99}
                    name="percentual_imposto" 
                    required 
                    placeholder="Insira o Percentual do Imposto"
                    onChange={valorInput}
                    pattern="[0-9]+$"
                /> 
                <input className={styles.lbl} type="submit"/>
            </form>
            <Link className={styles.btnVoltar} to={'/produtos'}>Voltar</Link>
        </section>
        </div>
    )
}