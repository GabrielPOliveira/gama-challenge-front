import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import FormAgendamento from "../../Components/FormAgendamento"
import ListAgendamentos from "../../Components/ListAgendamentos";
import AppointTable from '../../Components/Table'
import { useState } from "react";

export default function Agendamentos(){
    
    const [isLoad, setIsLoad] = useState(false);

    const openForm = () => {
        setIsLoad(!isLoad);
    }

    return (
        <div>
            <div class="wrapper">


                <HeadersPrivate />
                <div class="main-panel">
                    <NaviBar />
                    {isLoad ?
                        <FormAgendamento />
                        :
                        <div class="content">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <button style={{
                                            borderRadius: "12px",
                                            float: "right",
                                            background: "#D40054",
                                            fontWeight: "bold"
                                        }} onClick={openForm}>Cadastrar novo atendimento</button>
                                        <div class="card strpied-tabled-with-hover">
                                            <div class="card-body  table-responsive">
                                                <AppointTable />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}