import React from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

export default function Login() {
    let history = useHistory();
    return (
        <div>
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Login Privado</h1>
                    <Bar />
                    <form>
                        <div className="start">
                            <label for="email">E-mail</label>
                            <input type="text" id="email" />
                        </div>
                        <div className="start">
                            <label for="pass">Senha</label>
                            <input type="password" id="pass" />
                        </div>
                        <Link to="/contato">Esqueceu a senha?</Link>
                        <button type="submit" className="entrarHeader">Entrar</button>
                    </form>
                </div>
            </section>
        </div>
    );
}