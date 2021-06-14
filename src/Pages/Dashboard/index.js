import React from "react";
import { useHistory, Link } from "react-router-dom";
// import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";

import "./style.css";
import { Logout } from "../../Utils";

export default function Dash() {
    // JS
    let history = useHistory();
    return (
        <div>
            <div class="wrapper">
                
                <HeadersPrivate />

                <div class="main-panel">
                <NaviBar />
                    

                    <div class="content center">
                        <h1>Bem-vindo</h1>
                        <div>
                            <p></p>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
}