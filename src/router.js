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
// import Cadastro from "./Pages/Cadastro";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import Pacientes from "./Pages/Pacientes";
import Agendamentos from "./Pages/Agendamentos"
import AgendamentoUpdate from "./Pages/Agendamentos/update";
import AgendamentoConcluir from './Pages/Agendamentos/finish'
import AgendamentoCriar from "./Pages/Agendamentos/create";
import PacienteUpdate from "./Pages/Pacientes/update";
import PacienteProntuario from "./Pages/Pacientes/prontuario";
import Medicos from "./Pages/Medicos";
import MedicosCreate from "./Pages/Medicos/create";
import MedicosUpdate from "./Pages/Medicos/update";
import PrivateRoute from "./Components/PrivateRoute";
import Perfil from "./Pages/Perfil";

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
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/perfil" exact component={Perfil} />
                <PrivateRoute path="/pacientes" exact component={Pacientes} />
                <PrivateRoute path="/agendamentos" exact component={Agendamentos} />
                <PrivateRoute path="/agendamentos/cadastrar" exact component={AgendamentoCriar} />
                <PrivateRoute path="/agendamento/alterar" exact component={AgendamentoUpdate} />
                <PrivateRoute path="/agendamento/realizar" exact component={AgendamentoConcluir} />
                <PrivateRoute path="/paciente/alterar" exact component={PacienteUpdate} />
                <PrivateRoute path="/paciente/prontuario" exact component={PacienteProntuario} />
                <PrivateRoute path="/medicos" exact component={Medicos} />
                <PrivateRoute path="/medico/criar" exact component={MedicosCreate} />
                <PrivateRoute path="/medico/alterar" exact component={MedicosUpdate} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default Routes;