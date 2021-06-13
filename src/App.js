import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Routes from "./router";

export const App = () => {

    return(
        <>
            <Routes />;
            <ToastContainer />
        </>
    )
}
