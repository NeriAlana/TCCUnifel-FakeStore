import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Carrinho.css'; 

function Carrinho({ carrinho, setCarrinho, total, setTotal, onClose }) {
  const navigate = useNavigate();

  const excluirProduct = (product) => {
    const IndiceProduct = carrinho.findIndex(item => item.id === product.id);
    if (IndiceProduct !== -1) {
      const carrinhoNovo = [...carrinho];
      carrinhoNovo.splice(IndiceProduct, 1);
      setCarrinho(carrinhoNovo);
      setTotal(total - product.price);
    }
  };

  const arrayCarrinho = carrinho.reduce((acc, product) => {
    const ProductAddCarrinho = acc.find(item => item.id === product.id);
    if (ProductAddCarrinho) {
        ProductAddCarrinho.quantity += 1;
    }else {
        acc.push({...product, quantity: 1 });
    }
    return acc;
}, []);

  
const finalizarCompra = () => { 
  navigate('/checkout', { state: { carrinho, total } }); 
};

const handleClick = (product) => {
    const carrinhoNovo = [...carrinho, product]
    setCarrinho(carrinhoNovo);
    setTotal(total + product.price);
}

const handleClickProducts= () => {
  navigate(`/products`)
  onClose();
}

  return (
    <div className="carrinho-container">
      <h1>Seu Carrinho</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        
        arrayCarrinho.map(product => (
          <div key={product.id} className="carrinho-item">
            <p>{product.title}</p>
            <img src={product.image} alt="" width="100" />
            <p>Preço: R${product.price.toFixed(2)}</p>
            <button onClick={() => handleClick(product)}>+</button>
            <p >{product.quantity}</p>
            <button onClick={() => excluirProduct(product)}>-</button>
          </div>
        ))
      )}
      <h2>Total: R${total.toFixed(2)}</h2>
      <button disabled={total === 0} onClick={finalizarCompra}>Finalizar Compra</button>
      <button onClick={handleClickProducts}>Continuar Comprando</button>
    </div>
  );
}

export default Carrinho;
