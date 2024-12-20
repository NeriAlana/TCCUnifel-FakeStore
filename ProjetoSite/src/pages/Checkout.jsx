import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { carrinho: initialCarrinho, total: initialTotal } = location.state || { carrinho: [], total: 0 };
    const [carrinho, setCarrinho] = useState(initialCarrinho);
    const [total, setTotal] = useState(initialTotal);

    // Define a função para agrupar produtos semelhantes
    const getArrayCarrinho = (carrinho) => {
        return carrinho.reduce((acc, product) => {
        const ProductAddCarrinho = acc.find(item => item.id === product.id);
        if (ProductAddCarrinho) {
            ProductAddCarrinho.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, []);
    };

    // Estado para armazenar o carrinho agrupado
    const [arrayCarrinho, setArrayCarrinho] = useState(getArrayCarrinho(carrinho));

    // UseEffect para atualizar o arrayCarrinho sempre que o carrinho mudar
    useEffect(() => { 
        setArrayCarrinho(getArrayCarrinho(carrinho)); 
    }, [carrinho]);

    // Função para navegar para a página de produtos
    const handleClickProducts = () => {
        navigate('/products');
    };

    // Função para adicionar um produto ao carrinho
    const handleClick = (product) => {
        const carrinhoNovo = carrinho.map(item => 
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCarrinho(carrinhoNovo);
        setTotal(total + product.price);
    };

   // Função para remover um produto do carrinho 
    const excluirProduct = (product) => {
        const carrinhoNovo = carrinho.map(item =>
            item.id === product.id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCarrinho(carrinhoNovo);
        setTotal(total - product.price);
    };

    // Função para finalizar a compra
    const finalizarCompra = () => {
        if (total === 0) {
            return('O carrinho está vazio')
        }else {
        alert('Compra finalizada com sucesso!!');
        navigate(`/products`, { state: { carrinho: arrayCarrinho, total: total } }); // Atualizando o carrinho e o total na página de produtos, para que possa ser usado na página de checkout novamente.
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <h2>Finalize sua compra aqui.</h2>
            {arrayCarrinho.map((product) => (
                <div key={product.id}>
                    <p>${product.title} </p>
                    <img width='150px' src={product.image} alt={product.title} /> <br />
                    <button onClick={() => handleClick(product)}>+</button>
                    <button disabled={!carrinho.some(item => item.id === product.id) || total === 0} onClick={() => excluirProduct(product)}>-</button>
                    <p>{`Quantidade: ${product.quantity} unidades`}</p>
                </div>
            ))}
            <h2>Total: R${total.toFixed(2)}</h2>
            <button onClick={handleClickProducts}>Continuar Comprando</button>
            <button disabled={total === 0} onClick={finalizarCompra}>Finalizar Compra</button>
        </div>
    );
}

export default Checkout;
