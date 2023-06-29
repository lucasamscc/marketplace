import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Visualizar.module.css';
import { useParams } from "react-router-dom";

export default function Visualizar(props){

    const [data, setData] = useState([]);
    const {codigo} = useParams();
    

    useEffect(() => {
        const getProduto = async () =>{
            await fetch("http://localhost/crud/visualizar.php?codigo="+codigo)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.produto);
            });
        }
        getProduto();
    },[codigo])
    console.log(data)

    return (
        <div>
            <div className={styles.visualizarTabela}>
                <table>
                    <tr>
                        <td className={styles.titulo}>Codigo</td>
                        <td className={styles.titulo}>Nome</td>
                        <td className={styles.titulo}>Tipo</td>
                        <td className={styles.titulo}>Valor</td>
                    </tr>
                    <tr>
                        <td>{data.codigo}</td>
                        <td>{data.nome}</td>
                        <td>{data.tipo}</td>
                        <td>{data.valor}</td>
                    </tr>
                </table>
            </div>
                        <Link className={styles.btnVoltar} to={'/produtos'}>Voltar</Link>
        </div>
    );
}
