import React from "react";
import jwt_decode from 'jwt-decode';
import Logo from '../../assets/logoWhite.png';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/animate.min.css';
import '../../assets/css/demo.css';
import '../../assets/css/light-bootstrap-dashboard.css';
import '../../assets/css/pe-icon-7-stroke.css';

export default function HeaderPrivate() {
    // JS    
    const tokenType = jwt_decode(sessionStorage.getItem('Token')).type;

    return (
        <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">

            <div class="sidebar-wrapper">
                <div class="logo">
                    <a href="/"><img src={Logo} alt="Logo da Afya Medical Group" className="logoUp1" /></a>
                </div>

                <ul class="nav">
                    <li class="active">
                        <a href="/dashboard">
                            <i class="pe-7s-graph"></i>
                            <p>Bem-vindo</p>
                        </a>
                    </li>
                    <li>
                        <a href="/perfil">
                            <i class="pe-7s-user"></i>
                            <p>Perfil</p>
                        </a>
                    </li>
                    <li>
                        <a href="/pacientes">
                            <i class="pe-7s-note2"></i>
                            <p>Gerenciar Pacientes</p>
                        </a>
                    </li>
                    <li>
                        {tokenType == -1 ? (
                            <a href="/medicos">
                            <i class="pe-7s-users"></i>
                            <p>Gerenciar Médicos</p>
                        </a>
                        ) : (

                            <>
                            </>
                            
                        )
                        }
                    </li>
                    <li>
                        <a href="/agendamentos">
                            <i class="pe-7s-date"></i>
                            <p>Agendamentos</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}