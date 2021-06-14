import React from 'react';
import Logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

import './style.css';

export default function Header() {
    // JS

    return (
        <header className="flex">
            <a href="/"><img src={Logo} alt="Logo da Afya Medical Group" className="logoUp" /></a>
            <nav>
                <ul className="flex">
                    <Link to="/sobre">Sobre</Link>
                    <Link to="/servicos">Serviços</Link>
                    {/* <a href="https://api.whatsapp.com/send?phone=5511959381571&text=Ol%C3%A1%2C%20gostaria%20de%20realizar%20um%20agendamento.">Agendamento</a> */}
                    <Link to="/contato">Contato</Link>
                </ul>
            </nav>
            <div>
                <Link to="/login"><button id="modalLogin" className="entrarHeader">Entrar</button></Link>
                {/* <Link to="/cadastro"><button className="cadastrarHeader">Cadastrar</button></Link> */}
            </div>
        </header>
    )
}