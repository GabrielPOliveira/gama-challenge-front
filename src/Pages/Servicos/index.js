import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import imgNurse1 from '../../assets/nurse3.png';

export default function Servicos() {
    // JS
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo">
                <div className="half">
                    <h1>Alguns de nossos serviços</h1>
                    <Bar />
                    <ul>
                        <li>Médico Veterinário (Veterinário)</li>
                        <li>Psicólogo</li>
                        <li>Nutricionista</li>
                        <li>Fisioterapeuta</li>
                        <li>Terapeuta Ocupacional</li>
                        <li>Biólogo</li>
                        <li>Biomédico</li>
                    </ul>                </div>
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