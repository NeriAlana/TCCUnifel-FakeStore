import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'email-validator';
import './Login.css';


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
            <div className= "bloco">            
                <h1 >Login</h1>
                    <div className= "linha"></div>
                    <div className="input-container" >
                        <label className="email">Email</label>
                        <input 
                            onChange={(event) => setEmail(event.target.value)} 
                            type="email" 
                            placeholder="contato@react.com" 
                            className="input-field"/> 
                    </div><br />
            
                    <div className="input-container" >
                        <label className="senha">Password</label>
                        
                        <input  
                            onChange={(event) => setPassword(event.target.value)} 
                            type="password" 
                            placeholder="1234"
                            className="input-field"/>
                    </div>
                    <br />
                    <button className="entrar" disabled={!validator.validate(email)|| password.length < 8}
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