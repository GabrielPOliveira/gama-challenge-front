import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import imgNurse1 from '../../assets/nurse1.png';
import imgDoctor from '../../assets/Doctor.png';

import './style.css';

export default function Home() {
    // JS
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo">
                <div className="half">
                    <h1>Nunca é demais cuidar de quem você ama</h1>
                    <Bar />
                    <p>A saúde é prioridade para aquele que amamos, a Afya Medical Group se preocupa com você. Ao efetuar o cadastro, a primeira consulta é gratuita.</p>
                    {/* <Link to="/cadastro" className="buttonA">Cadastro</Link> */}
                </div>
                <img src={imgNurse1} alt="Ícone de enfermeira com um cadeirante." className="imgPages" />
            </section>
            <section className="flex spaceSections recuo">
                <img src={imgDoctor} alt="Ícone de enfermeira com um cadeirante." className="imgPages" />
                <div className="half">
                    <h1>Melhores profissionais do mercado</h1>
                    <Bar />
                    <p>Atendimento 24h, sete dias por semana. Confira a lista de serviços oferecidos.</p>
                    <Link to="/servicos" className="buttonA">Conheça nossos serviços</Link>
                </div>
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