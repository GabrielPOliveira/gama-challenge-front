import React from "react";
import { useHistory } from "react-router-dom";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";

import "./style.css";

export default function Dash() {
    // JS
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