import React from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import './style.css';

export default function Login() {
    // JS
    let history = useHistory();
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Login</h1>
                    <Bar />
                    <form>
                        <div className="start">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" required />
                            <label for="pass">Senha</label>
                            <input type="password" id="pass" required />
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