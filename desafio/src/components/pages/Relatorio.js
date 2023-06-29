import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from './Relatorio.module.css'
import { Link } from "react-router-dom";

export default function Relatorio(){
   
    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''

    });

    const getRelatorio = async() => {
        fetch("http://localhost/crud/relatorio.php")
        .then((response) => response.json())
        .then((responseJson) => (
        setData(responseJson.records)
        ));
    }
    useEffect(() => {
        getRelatorio();
    }, [])

    return(
    
        <div >
        <div>
        <h1 className={styles.relatorio}>Relatório de Vendas</h1>
        </div>
        
        <table className={styles.tabelaRelatorio}>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Data</th>
                    <th>Total</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(data).map(records => (
                    <tr key={records.codigo}>
                        <td>{records.codigo}</td>
                        <td>{records.data}</td>
                        <td>{records.total}</td>
                        <td><Link className={styles.btnVisualizar} to={"/visualizar-venda/"+ records.codigo}>Visualizar</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}