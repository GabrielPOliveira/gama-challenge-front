import React from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import imgNurse1 from '../../assets/msg.png';

import './style.css';

export default function Contato() {
    // JS
    let history = useHistory();
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo">
                <div className="half">
                    <h1>Dúvidas ou sugestões? Envie uma mensagem</h1>
                    <Bar />
                    <form>
                        <div className="labels">
                            <label for="nome">Nome</label>
                            <input type="text" id="nome" />
                            <label for="email">E-mail</label>
                            <input type="email" id="email" />
                            <label for="tel">Telefone</label>
                            <input type="text" id="tel" />
                            <label for="textareaMsg">Mensagem</label>
                            <textarea id="textareaMsg" rows="5" cols="40"></textarea>
                        </div>
                        <button id="enviarForm" className="buttonA">Enviar</button>
                    </form>
                </div>
                <img src={imgNurse1} alt="Ícone de enfermeira com um cadeirante." className="imgPages" />
            </section>
            {/* <section className="spaceSections center banner">
                <h1>Nunca é demais cuidar de quem você ama</h1>
                <br />
                <p className="center">Rápido, facil e prático. Fale diretamento com um de nosso atendentes</p>
                <a href="https://api.whatsapp.com/send?phone=5511959381571&text=Ol%C3%A1%2C%20gostaria%20de%20realizar%20um%20agendamento." target="_blank" className="buttonA">Agendar uma consulta</a>
                <Link to="/contato" className="buttonA">Agendar uma consulta</Link>
            </section> */}
            <Footer />
        </div>
    );
}