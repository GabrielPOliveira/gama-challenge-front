import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import FormAgendamento from "../../Components/FormAgendamento"
import api from '../../services/api'

export default function Agendamentos(){

    const [client, setClient] = useState({data: []});

    let history = useHistory();

    useEffect(() => {
        api.get('/clientes', { headers: {Authorization: `Bearer ${sessionStorage.getItem('Token')}`}})
            .then(response => {
                setClient({data : response.data});

            });
    }, [])

    return (
        <div>
            <div class="wrapper">
               
               
            <HeadersPrivate />
                <div class="main-panel">                
                <NaviBar />                    
                <FormAgendamento />

                    
                    

                </div>
            </div>
        </div>
    )
}