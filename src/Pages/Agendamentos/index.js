import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import AppointTable from '../../Components/Table'
import { useHistory } from "react-router-dom";

export default function Agendamentos(){
    
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
                                    <div class="col-md-12">
                                        <div class="card strpied-tabled-with-hover">
                                            <div class="card-body  table-responsive">
                                                <AppointTable />
                                                <button style={{
                                                    borderRadius: "12px",
                                                    float: "right",
                                                    background: "#D40054",
                                                    fontWeight: "bold",
                                                    color: "white",
                                                    marginTop: "25px"
                                                }} onClick={openForm}>Cadastrar novo atendimento</button>
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