import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './VisualizarTipo.module.css'

export default function VisualizarTipo(props){

    const [data, setData] = useState([]);
    const {codigo} = useParams();
    

    useEffect(() => {
        const getTipoProduto = async () =>{
            await fetch("http://localhost/crud/visualizarTipo.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.tipo_produto);
            });
        }
        getTipoProduto();
    },[codigo])

    return(
        <div>
            <div className={styles.visualizarTabela}>
                <table>
                    <tr>
                        <td className={styles.titulo}>Codigo</td>
                        <td className={styles.titulo}>Nome</td>
                        <td className={styles.titulo}>% Imposto</td>
                    </tr>
                    <tr>
                        <td>{data.codigo}</td>
                        <td>{data.nome}</td>
                        <td>{data.percentual_imposto}</td>
                    </tr>
                </table>
            </div>
                        <Link className={styles.btnVoltar} to={'/produtos'}>Voltar</Link>
        </div>
    )
}