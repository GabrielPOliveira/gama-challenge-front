import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Bar from "../../Components/Bar";

import "./style.css";

export default function NotFound() {
    // JS
    return (
        <div>
            <Header />
            <section className="flex spaceSections recuo center">
                <div className="center">
                    <h1>Página não encontrada...</h1>
                    <Bar />
                    <div>
                        <p>Essa página não existe, por favor verifique se o link está correto ou retorne a página inicial</p>
                        <Link to="/"><button className="entrarHeader">Voltar</button></Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}