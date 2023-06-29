import styles from './Navbar.module.css'
import React from 'react'

function Navbar() {


    return (
        <div className={styles.myNavbar}>
            <h1>Loja do Mirante</h1>
            <a href="/home">Home</a>
            <a href="/venda">Venda</a>
            <a href="/produtos">Produtos</a>
            <a href="/tipos">Tipos de Produtos</a>
            <a href="/relatorio">Relatório</a>
        </div>
    )
}

export default Navbar