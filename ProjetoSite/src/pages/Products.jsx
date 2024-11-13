
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Carrinho from "./Carrinho";
import Modal from "./Modal";
import './Products.css';

function Products(){
    const [products, setProducts] = useState([]);
    const [carrinho, setCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const getData = async () => { 
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setProducts(json);
        }; 
        getData(); 
    }, []);

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
    };

    const handleClickProduct= (id) => {
        navigate(`/product/${id}`)
    };

    const handleClickSair = () => {
        navigate('/');
    };
    
    

    return(
        <>
        <div className="corpo-pagina">
        <header className="header"> 
            <button className="sair" onClick={handleClickSair}> 
                <i className="fas fa-sign-out-alt"></i>  
            </button> 
            <button className="carrinho" onClick={() => setIsModalOpen(true)}> 
                <i className="fas fa-shopping-cart"></i> ({carrinho.length}) 
            </button> 
        </header>
            <h1>Produtos</h1>
            <div className="main-container">
                <div >
                        <div className="produto-container">
                            {products.map((product) => (
                                <div className="produto-item" key={product.id}>
                                    <button onClick={() => handleClickProduct(product.id)} style={{width: '400px', height:'400px'}}>
                                        <p>{product.title}</p>
                                        <img src={product.image} alt={product.title} width="150" />
                                        <p>{`R$ ${product.price}`}</p> <br />
                                    </button>
                                    <div className="button-container">
                                        <button onClick={() => handleClick(product)}>+</button>
                                        <button onClick={() => handleClick(product)}>Adicionar ao Carrinho</button>
                                        <button disabled={!carrinho.some(item => item.id === product.id) || total === 0} onClick={() => excluirProduct(product)}>-</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <button className="checkout" onClick={() => setIsModalOpen(true)}>Ver Carrinho</button><br />
                </footer>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> 
                <Carrinho 
                carrinho={carrinho} 
                setCarrinho={setCarrinho} 
                total={total} 
                setTotal={setTotal} 
                onClose={() => setIsModalOpen(false)}
                /> 
            </Modal>
        </>
    );
}

export default Products;