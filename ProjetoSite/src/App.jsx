import './App.css';
import Login from './pages/Login';
import Products from './pages/Products';
import DetalheProduct from './pages/DetalheProduct';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';  // Adicionar a página de Checkout
import Cadastro from './pages/Cadastro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<DetalheProduct />} />
          <Route path='/carrinho' element={<Carrinho/>}/>
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cadastro' element={<Cadastro />} />
        </Routes>
      </Router>
  );
}

export default App;
