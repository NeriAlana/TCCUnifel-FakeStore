import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Products from "./Products";
import styles from './DetalheProduct.module.css'

function DetalheProduct() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [total, setTotal] = useState(0);
    const [carrinho, setCarrinho] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            const json = await response.json();
            setProduct(json);
        };
        getData();
    },[id]);

    const handleClick = (product) => {
        const carrinhoNovo = [...carrinho, product]
        setCarrinho(carrinhoNovo);
        setTotal(total + product.price);
    }

    
    const excluirProduct = (product) => {
        const IndiceProduct = carrinho.findIndex(item => item.id === product.id);
        if (IndiceProduct !== -1) {
            const carrinhoNovo = [...carrinho];
            carrinhoNovo.splice(IndiceProduct, 1);
            setCarrinho(carrinhoNovo);
            setTotal(total - product.price);
        }
    }

    const handleClickProducts= () => {
        navigate(`/products`)
    }

    return(
        <>
            <h1>Detalhes do Produto</h1>
            <p>{product.title}</p>
            <p>{product.description}</p>
            <img src={product.image} alt="" width='400px' height= '450px'/>
            <p>Preço: {`R$${product.price}`}</p>
            <div className="button-container">
                <button onClick={() => handleClick(product)}>+</button>
                <button onClick={() => handleClick(product)}>Adicionar ao Carrinho</button>
                <button disabled={total === 0} onClick={() => excluirProduct(product)}>-</button><br />
            </div><br />
            <h2>Total: R${total.toFixed(2)}</h2><br />
                <button onClick={() => handleClickProducts(Products)}>Voltar para Produtos</button>

    </>
    );
    
}
export default DetalheProduct;