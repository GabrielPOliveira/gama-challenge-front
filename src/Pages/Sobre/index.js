import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import imgNurse1 from '../../assets/nurse2.png';

export default function Sobre() {
    // JS
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo">
                <div className="half">
                    <h1>Sobre a Afya Medical Group</h1>
                    <Bar />
                    <p>Inovando enquanto ajuda pessoas no tratamento de doenças e patologias.</p>
                    <Link to="/contato" className="buttonA">Contato</Link>
                </div>
                <img src={imgNurse1} alt="Ícone de enfermeira com um cadeirante." className="imgPages" />
            </section>
            <section className="spaceSections center banner">
                <h1>Nunca é demais cuidar de quem você ama</h1>
                <br />
                <p className="center">Rápido, facil e prático. Fale diretamento com um de nosso atendentes</p>
                <Link to="/contato" className="buttonA">Entre em contato</Link>
            </section>
            <Footer />
        </div>
    );
}