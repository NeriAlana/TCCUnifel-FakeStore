import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Products from './Products';


function Checkout() {
    const location = useLocation(); 
    const navigate = useNavigate();
    const { carrinho, total } = location.state; // Desestruturação de obj para acessar carrinho e total. o use location foi usado para pegar informações dos produtos add ao carrinho, bem como o valor total das coisas adicionadas ao carrinho  feitos lá na pág de produtos
    
    const arrayCarrinho = carrinho.reduce((acc, product) => {
        const ProductAddCarrinho = acc.find(item => item.id === product.id);
        if (ProductAddCarrinho) {
            ProductAddCarrinho.quantity += 1;
        }else {
            acc.push({...product, quantity: 1 });
        }
        return acc;
    }, []);

    const handleClickProducts= (id) => {
        navigate(`/products`)
    }

    return (
        <div>
            <h1>Checkout</h1>
            <p>Finalize sua compra aqui.</p>
            {arrayCarrinho.map((product) => (
                <div key={product.id}>
                    <p >{`${product.title} Quantidade: ${product.quantity} unidades`}</p>
                    <img width= '150px' src={product.image} alt={product.title} />
                </div>
            ))}
            <p> {`Total R$ ${total.toFixed(2)}`}</p>
            <button onClick={() => handleClickProducts(Products)}>Continuar Comprando</button>
        </div>
    );
}

export default Checkout;


