import styles from './Home.module.css';

export default function Home(){
    return (
        <div>
            <h1 className={styles.h1}>Bem Vindo à Loja do Mirante</h1>
            <p className={styles.prgf}>A Loja do Mirante faz parte de um desafio proposto para os estagiários da SoftExpert, visando a criação de um sistema PDV.</p>
            <h2 className={styles.h2}>Descrição das rotas:</h2>
            <ul className={styles.listaPrincipal}>
                <li>
                Venda:  O usuário poderá selecionar o produto para adicionar a uma venda, selecionando sua quantidade os valores unitário e total devem ser atualizados. Ao incluir o produto deve aparecer no cupom fiscal e ao concluir, a venda deve ser persistida no sistema.
                </li>
                <li>
                Produtos: Listagem de produtos, você deve criar o CRUD levando em conta que um produto deve ter:
                    <ul className={styles.listaSecundaria}>
                        <li>Nome</li>
                        <li>Valor</li>
                        <li>Tipo</li>
                    </ul>
                </li>
                <li>
                Tipo de produto: Listagem dos tipos, aqui é outro CRUD onde o tipo deve conter: 
                </li>
                    <ul>
                        <li>Nome</li>
                        <li>% do Imposto</li>
                    </ul>
                <li>Relatório: No relatório é uma listagem de vendas realizadas onde deve ser possível visualizar uma venda</li>
            </ul>
        </div>
        )
}