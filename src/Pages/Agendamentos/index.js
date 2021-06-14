import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import FormAgendamento from "../../Components/FormAgendamento"
import ListAgendamentos from "../../Components/ListAgendamentos";
import AppointTable from '../../Components/Table'
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Agendamentos(){
    
    const [isLoad, setIsLoad] = useState(false);

    let history = useHistory();

    const openForm = () => {
        history.push({
            pathname: '/agendamentos/cadastrar' 
        })
    }

    return (
        <div>
            <div class="wrapper">


                <HeadersPrivate />
                <div class="main-panel">
                    <NaviBar />
                    
                        <div class="content">
                            <div class="container-fluid">
                                <div class="row">
                                        <button style={{
                                            borderRadius: "12px",
                                            float: "right",
                                            background: "#D40054",
                                            fontWeight: "bold",
                                            color: "white",
                                            marginBottom: "10px",
                                            marginRight: "15px"
                                        }} onClick={openForm}>Cadastrar novo atendimento</button>
                                    <div class="col-md-12">
                                        <div class="card strpied-tabled-with-hover">
                                            <div class="card-body  table-responsive">
                                                <AppointTable />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    

                </div>

            </div>
        </div>
    )
}