import React from "react";
import { useHistory, Link } from "react-router-dom";
// import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";

import "./style.css";

export default function Dash() {
    // JS
    let history = useHistory();
    return (
        <div>
            <div class="wrapper">
                <NaviBar />
                <HeadersPrivate />

                <div class="main-panel">


                </div>
            </div>
        </div>
    );
}