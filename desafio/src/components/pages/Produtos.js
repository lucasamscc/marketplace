import { useEffect, useState } from "react"
import React from "react";
import styles from './Produtos.module.css';
import { Link } from "react-router-dom";
import Visualizar from "../Visualizar";
import Cadastrar from "../Cadastrar";

function Produtos(){
   
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''

    });

    const getProdutos = async() => {
        fetch("http://localhost/crud/listaProdutos.php")
        .then((response) => response.json())
        .then((responseJson) => (
        setData(responseJson.records)
        ));
    }

    const apagarProduto = async(codProduto) =>{
        await fetch("http://localhost/crud/apagar.php?codigo=" + codProduto)
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
                mensagem: "Erro, produto não apagado com sucesso"
            });
        });
    };


    useEffect(() => {
        getProdutos();
    }, [])


    

    return (
        <div className={styles.container}>
            <div>
            <h1 className={styles.ListaDeProdutos}>Lista de Produtos</h1>
            </div>
            
            {status.type === 'erro' ? <p className={styles.AlertDanger}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p className={styles.AlertSuccess}>{status.mensagem}</p> : ""}

            <div>
                <Link className={styles.btnCadastrar} to={"/cadastrar/"}>Cadastrar</Link>
            </div>
            
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(produto => (
                        <tr key={produto.codigo}>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.valor}</td>
                            <td>{produto.tipo}</td>
                            <td>
                                <Link className={styles.btnVisualizar} to={"/visualizar/"+ produto.codigo}>Visualizar</Link><Link className={styles.btnEditar} to={"/editar/" + produto.codigo}>Editar</Link>
                                <button className={styles.btnApagar} onClick={() =>apagarProduto(produto.codigo)}>Apagar</button>
                            </td>    
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Produtos