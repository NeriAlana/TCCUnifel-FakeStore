import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import validator from 'email-validator';
import styles from './Login.module.css'; // Importa o CSS Module

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        if (validator.validate(email) && password.length >= 8) {
            navigate('/products');
        }
    }

    const handleClickCadastro = () => {
        navigate('/cadastro');
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <form>
                    <div className={styles.bloco}>
                        <h1>Login</h1>
                        <div className={styles.linha}></div>
                        <div className={styles.inputContainer}>
                            <label className={styles.email}>Email</label>
                            <input
                                onChange={(event) => setEmail(event.target.value)}
                                type="email"
                                placeholder="contato@react.com"
                                className={styles.inputField}
                            />
                        </div><br />
                        <div className={styles.inputContainer}>
                            <label className={styles.senha}>Password</label>
                            <input
                                onChange={(event) => setPassword(event.target.value)}
                                type="password"
                                placeholder="1234"
                                className={styles.inputField}
                            />
                        </div>
                        <br />
                        <button className={styles.entrar} disabled={!validator.validate(email) || password.length < 8} onClick={handleClick}>Entrar</button>
                        <br /><br />
                        <Link to='/cadastro' className={styles.boton} onClick={handleClickCadastro}>Cadastre-se</Link>
                        <Link to='/resetSenha' className={styles.boton}>Esqueceu a senha?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
