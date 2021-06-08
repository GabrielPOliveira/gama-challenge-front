import React from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import './style.css';

export default function Cadstro() {
    // JS
    let history = useHistory();
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Cadastro</h1>
                    <Bar />
                    <form className="formCadastro">
                        <div className="start">
                            <div>
                                <label for="nome">Nome completo</label>
                                <input type="text" id="nome" />
                            </div>
                            <div>
                                <label for="email">E-mail</label>
                                <input type="text" id="email" />
                            </div>
                            <div>
                                <label for="cpf">CPF</label>
                                <input type="number" id="cpf" />
                            </div>
                            <div>
                                <label for="tel">Telefone</label>
                                <input type="tel" id="tel" />
                            </div>
                            <div>
                                <label for="cep">CEP</label>
                                <input type="number" id="cep" />
                            </div>
                            <div>
                                <label for="rua">Logradouro</label>
                                <input type="text" id="rua" />
                            </div>
                            <div>
                                <label for="bairro">Bairro</label>
                                <input type="text" id="bairro" />
                            </div>
                            <div>
                                <label for="cidade">Cidade</label>
                                <input type="text" id="cidade" />
                            </div>
                            <div>
                                <label for="uf">UF</label>
                                <input type="text" id="uf" />
                            </div>
                            <div>

                                <label for="n">Número</label>
                                <input type="number" id="n" />
                            </div>
                        </div>
                        <br />
                        <p className="start">Não informe sua senha a ninguém</p>
                        <br />
                        <div className="start">
                            <label for="pass">Senha</label>
                            <input type="password" id="pass" />
                            <label for="passconfirm">Confirmar senha</label>
                            <input type="password" id="passconfirm" />
                            <input type="checkbox" id="check" />
                            <label for="check">Aceitar os <b>termos de condição e uso.</b></label>
                        </div>
                        <button type="submit" className="entrarHeader">Cadastrar</button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}