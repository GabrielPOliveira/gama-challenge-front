import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import Home from "./Pages/Home";
import Sobre from "./Pages/Sobre";
import Servicos from "./Pages/Servicos";
import Contato from "./Pages/Contato";
import Login from "./Pages/Login";
import LoginPrivado from "./Pages/LoginPrivado";
// import Cadastro from "./Pages/Cadastro";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import Pacientes from "./Pages/Pacientes";



function Routes() {
    // JS de rotas privadas e JWT
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/sobre" exact component={Sobre} />
                <Route path="/servicos" exact component={Servicos} />
                <Route path="/contato" exact component={Contato} />
                <Route path="/login" exact component={Login} />
                <Route path="/loginPrivado" exact component={LoginPrivado} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/pacientes" exact component={Pacientes} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default Routes;