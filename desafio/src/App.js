import './App.css';
import Navbar from './components/Navbar';
import Produtos from './components/pages/Produtos';
import {Route,Routes,BrowserRouter as Router} from "react-router-dom";
import Home from './components/pages/Home';
import Venda from './components/pages/Venda';
import Relatorio from './components/pages/Relatorio';
import Tipos from './components/pages/Tipos';
import Visualizar from './components/Visualizar';
import Cadastrar from './components/Cadastrar';
import Editar from './components/list_components/Editar';
import VisualizarTipo from './components/type_components/VisualizarTipo';
import EditarTipo from './components/type_components/EditarTipo';
import CadastrarTipo from './components/type_components/CadastrarTipo';
import VendasAtt from './components/pages/VendasAtt';
import VisualizarVenda from './components/relatorio_components/VisualizarVenda';

function App() {
  
  
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path='/home' element={<Home />}></Route>
          <Route path='/venda' element={<Venda />}></Route>
          <Route path='/produtos' element={<Produtos />}></Route>
          <Route path='/tipos' element={<Tipos />}></Route>
          <Route path='/relatorio' element={<Relatorio />}></Route>
          <Route path='/visualizar/:codigo' element={<Visualizar />}></Route>
          <Route path='/cadastrar' element={<Cadastrar/>}></Route>
          <Route path='/editar/:codigo' element={<Editar />}></Route>
          <Route path='/visualizar-tipo/:codigo' element={<VisualizarTipo />}></Route>
          <Route path='/editar-tipo/:codigo' element={<EditarTipo />}></Route>
          <Route path='/cadastrar-tipo' element={<CadastrarTipo/>}></Route>
          <Route path='*' component={<Home/>}></Route>
          <Route path='/visualizar-venda/:pedido' element={<VisualizarVenda />}></Route>
         
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
