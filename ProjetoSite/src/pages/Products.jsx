import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Carrinho from "./Carrinho";
import Modal from "./Modal";
import styles from './Products.module.css';

function Products(){
    const [products, setProducts] = useState([]); 
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [carrinho, setCarrinho] = useState([]); 
    const [total, setTotal] = useState(0); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate = useNavigate();
    
    useEffect(() => { 
        const getData = async () => { 
            const response = await fetch('https://fakestoreapi.com/products');
            const json = await response.json();
            setProducts(json);
            setFilteredProducts(json); 
            const categories = [...new Set(json.map(product => product.category))]; 
            setCategories(categories);
        }; 
        getData(); 
    }, []);
    
    useEffect(() => { 
        if (selectedCategory === '') { 
            setFilteredProducts(products); 
        } else { 
            const filtered = products.filter(product => product.category === selectedCategory); 
            setFilteredProducts(filtered); 
        } 
    }, [selectedCategory, products]); 
    
    const handleCategoryChange = (event) => { 
        setSelectedCategory(event.target.value); 
    };

    const handleClick = (product) => {
        const carrinhoNovo = [...carrinho, product];
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
        <div className={styles.pageCapa}>
            <div className={styles.corpoPagina}>
                <header className={styles.header}> 
                    <button className={styles.sair} onClick={handleClickSair}> 
                        <i className="fas fa-sign-out-alt"></i>  
                    </button> 
                    <button className={styles.carrinho} onClick={() => setIsModalOpen(true)}> 
                        <i className="fas fa-shopping-cart"></i> {carrinho.length}
                    </button> 
                </header>
                    <h1 className={styles.h1}>Produtos</h1>
                    <div className={styles.filterContainer}>
                        <label htmlFor="category">Filtrar por Categoria: </label> 
                        <select id="category" value={selectedCategory} onChange={handleCategoryChange}> 
                            <option value="">Todas</option> 
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option> 
                            ))} 
                        </select>
                    </div>
                    <div className={styles.produtoContainer}>
                        {filteredProducts.map((product) => (
                            <div className={styles.produtoItem} key={product.id}>
                                <button className={styles.produtoButton} onClick={() => handleClickProduct(product.id)} >
                                    <img className={styles.productImage} src={product.image} alt={product.title} />
                                    <h2 >{product.title}</h2>
                                    <div>
                                        <p className={styles.preco}>{`R$ ${product.price}`}</p> <br />
                                    </div>
                                    <div className={styles.buttonContainer}>
                                        {/* <button className={styles.buttonAdd} onClick={() => handleClick(product)}>+</button> */}
                                        <button className={styles.buttonAdd} onClick={() => handleClick(product)}>Adicionar ao Carrinho</button>
                                        {/* <button className={styles.buttonExc} disabled={!carrinho.some(item => item.id === product.id) || total === 0} onClick={() => excluirProduct(product)}>-</button> */}
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                <footer className={styles.footer}>
                    <p>
                        &copy; 2024 Alana Neri - Fakestore. Todos os direitos reservados <br/> 
                        Contato: marketplace@fakestore.com 
                    </p>
                </footer>
            </div>
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
