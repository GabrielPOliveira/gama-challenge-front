import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";
import api from '../../services/api'

import './style.css';

export default function Login() {
    
    const [user, setUser] = useState({login: "", password: ""});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const creds ={
            login: user.login,
            password: user.password
        }

        const res = await api.post('/logar', creds);
        
        setUser({login: "", password: ""});

        if (res.status === 200){

            sessionStorage.setItem("Token", res.data.token);
            window.location = '/dashboard'
        } else {
            alert(res.data.error);
        }

    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    let history = useHistory();
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Login</h1>
                    <Bar />
                    <form onSubmit={handleSubmit}>
                        <div className="start">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" name= "login" value={user.login} onChange={handleChange} required />
                            <label for="pass">Senha</label>
                            <input type="password" id="pass" name="password" value={user.password} onChange={handleChange} required />
                        </div>
                        <Link to="/contato">Esqueceu a senha?</Link>
                        <button type="submit" className="entrarHeader">Entrar</button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}