import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './VisualizarVenda.module.css';
import { useParams } from "react-router-dom";

export default function Visualizar(props){

    const [data, setData] = useState([]);
    const {pedido} = useParams();
    

    useEffect(() => {
        const getPedido = async () =>{
            await fetch("http://localhost/crud/visualizarVenda.php?pedido="+pedido)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson.pedidos);
            });
        }
        getPedido();
    },[pedido])
    console.log(data);
    if (!data) return null;

    return (
        <div>
            <div className={styles.visualizarTabela}>
            <table>
                <thead>
                    <tr>
                    <th className={styles.titulo}>pedido</th>
                    <th className={styles.titulo}>produto</th>
                    <th className={styles.titulo}>quantidade</th>
                    <th className={styles.titulo}>total</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(data).map(pedido => (
                        <tr key={pedido.pedido}>
                        <td>{pedido.pedido}</td>
                        <td>{pedido.produto} - {pedido.nome}</td>
                        <td>{pedido.quantidade}</td>
                        <td>{pedido.total}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>
            <Link className={styles.btnVoltar} to={'/relatorio'}>Voltar</Link>
        </div>
    );
}
