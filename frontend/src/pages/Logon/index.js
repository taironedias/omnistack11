import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {

    const [id, setId] = useState('');
    const [classError, setClassError] = useState('');
    const [messageErrorLogin, setMessageErrorLogin] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            setMessageErrorLogin('Login inválido, tente novamente!');
            setClassError('error');
            setId('');
            // alert('Erro ao fazer o login.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        className={classError}
                        placeholder="Seu ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <span className={classError}>{messageErrorLogin}</span>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="custom-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}