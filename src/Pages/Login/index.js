import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";
import {backAPI} from '../../services/api'
import { toast } from "react-toastify";

import './style.css';

export default function Login(props) {

    const initialState = {
        login: "",
        password: ""
    }
    
    const [user, setUser] = useState(initialState);

    let history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const creds ={
            login: user.login,
            password: user.password
        }

        const res = await backAPI.post('/logar', creds);
    
        if (res.status === 200){
            sessionStorage.setItem("Token", res.data.token);

            toast.success(`Seja bem vindo, ${user.login}`, {
                onClose: () => {history.push('/dashboard')},
                position: "top-center",
                autoClose: 1500,
                pauseOnHover: false
            })
        } else {
            toast.error('Usuário ou senha incorretos', {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: false
            });
        }
        
        setUser(initialState);
    }

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Login</h1>
                    <Bar />
                    <form onSubmit={handleSubmit}>
                        <div className="start">
                            <label for="login">Login</label>
                            <input type="text" id="login" name= "login" value={user.login} onChange={handleChange} required />
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