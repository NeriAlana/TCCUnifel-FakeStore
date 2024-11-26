import validator from 'email-validator';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import './Cadastro.css';
function Cadastro() {
    const navigate = useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const handleClick = () => {
        if (validator.validate(email) && password.length >= 8){
            navigate('/products')
            // Se o e-mail for válido e a senha for maior ou igual a 8 dígitos, navega para a tela de produtos
        }
        
    };

    const handleClickFinalizar = () => {
        alert('Cadastro finalizado com sucesso!')
        navigate('/products')
    };

    return(
        <>
        <div className='bloco'>
            <h1>Cadastrar</h1>
            <div className= "linha"></div>
            <input 
                onChange={(event) => setEmail(event.target.value)} 
                type="email" 
                placeholder="Digite um e-mail válido" 
                // className="input-field"
            /> <br/>
            <input  
                onChange={(event) => setPassword(event.target.value)} 
                type="password" 
                placeholder="Digite uma senha (mínimo 8 caracteres)" 
                // className="input-field"
            /><br/>
            <button onClick={handleClickFinalizar}>Finalizar Cadastro</button>
            <p>Ao se inscrever, você concorda com as políticas da NeriStore </p>

            <p>Tem uma conta?</p>
            <Link to='/' className='boton' onClick={handleClick}>Entre</Link>
            
        </div>
        </>
    );
}

export default Cadastro;
