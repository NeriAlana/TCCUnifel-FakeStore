import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'email-validator';
import styles from './Login.module.css';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');


    const handleClick = () => {
        if (validator.validate(email) || password.length >= 8){
            navigate('/products')
            // Se o e-mail for válido e a senha for maior ou igual a 8 dígitos, navega para a tela de produtos
        }
    }

    const handleClickCadastro = () => {
        navigate('/cadastro')
    };
  

    return(
        <div>
        <form >
            <div className= {styles.bloco}>            
                <h1 >Login</h1>
                    <div className= {styles.linha}></div>
                    <div className={styles['input-container']} >
                        <label className="email">Email</label>
                        <input 
                            onChange={(event) => setEmail(event.target.value)} 
                            type="email" 
                            placeholder="contato@react.com" 
                            className={styles['input-field']}/> 
                    </div><br />
            
                    <div className={styles['input-container']} >
                        <label className={styles.senha}>Password</label>
                        
                        <input  
                            onChange={(event) => setPassword(event.target.value)} 
                            type="password" 
                            placeholder="1234"
                            className="input-field"/>
                    </div>
                    <br />
                    <button disabled={!validator.validate(email)|| password.length < 8}
                    onClick={handleClick}>Entrar</button>
                    <br /><br />
                    <Link to='/cadastro' className='boton' onClick={handleClickCadastro}>Cadastre-se</Link>    
                    <Link to='/resetSenha' className='boton'>Esqueceu a senha?</Link>
            </div> 
        </form> 
        </div> 
    )

}

export default Login;