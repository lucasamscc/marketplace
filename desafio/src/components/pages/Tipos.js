import { useEffect, useState } from "react";
import React from "react";
import styles from './Tipos.module.css';
import { Link } from "react-router-dom";


export default function Tipos(){

    const [data, setData] = useState([]);
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''

    });

    const getTipos = async() => {
        fetch("http://localhost/crud/tiposProdutos.php")
        .then((response) => response.json())
        .then((responseJson) => (
        setData(responseJson.records)
        ));
    }

    const apagarTipo = async(codTipo) =>{
        await fetch("http://localhost/crud/apagarTipo.php?codigo=" + codTipo)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.erro) {
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
        }).catch(()=>{
            setStatus({
                type: 'erro',
                mensagem: "Erro, Tipo não apagado com sucesso"
            });
        });
    };    

    useEffect(() => {
        getTipos();
    }, [])

    return (
       
        <div>
            <div>
                <h1 className={styles.TiposDeProdutos}>Tipos de Produtos</h1>
            </div>
            {status.type === 'erro' ? <p className={styles.AlertDanger}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}
            <div>
                <Link className={styles.btnCadastrar} to={"/cadastrar-tipo/"}>Cadastrar</Link>
            </div>
            <table className={styles.tabelaTipo}>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>% Imposto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(tipo_produto => (
                        <tr key={tipo_produto.codigo}>
                            <td>{tipo_produto.codigo}</td>
                            <td>{tipo_produto.nome}</td>
                            <td>{tipo_produto.percentual_imposto}</td>
                            <td><Link className={styles.btnVisualizar} to={"/visualizar-tipo/"+ tipo_produto.codigo}>Visualizar</Link><Link className={styles.btnEditar} to={"/editar-tipo/" + tipo_produto.codigo}>Editar</Link>
                            <button className={styles.btnApagar}onClick={() =>apagarTipo(tipo_produto.codigo)}>Apagar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
