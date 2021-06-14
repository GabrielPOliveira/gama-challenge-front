import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { backAPI } from "../../services/api";
import moment from 'moment-timezone';

export default function ListAgendamentos() {

    const [list, setList] = useState({ dataAppoint: [] });

    useEffect(() => {
        backAPI.get('/consultas', {headers: {Authorization: `Bearer ${sessionStorage.getItem('Token')}`}})
            .then(response => {
                console.log(response.data.appointments)
                setList({dataAppoint: response.data.appointments})
            });
            
    }, []);

    const resolveStatus = id => {
        if (id === 1){
            return "AGENDADO";
        } else if (id === 2){
            return "REALIZADO";
        } else if (id === 3){
            return "CANCELADO";
        }
    }

    let history = useHistory();
    return (

        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card strpied-tabled-with-hover">
                            <div class="card-header ">
                                <h4 class="card-title">Bem Vindo Pacientes</h4>
                                <p class="card-category">Here is a subtitle for this table</p>
                            </div>
                            <div class="card-body  table-responsive">
                                <table class="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Agendamento</th>
                                            <th>Atendimento</th>
                                            <th>Status</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {list.dataAppoint.map(agendamento => {
                                            const aux = resolveStatus(agendamento.appointments_statusId);
                                            const day = moment.utc(agendamento.scheduling_date).format('DD/MM/YYYY HH:mm')
                                            return(
                                                <tr>
                                                    <td>{agendamento.Client.name}</td>     
                                                    <td>{day}</td>                                              
                                                    <td>{agendamento.appointment_date}</td>                                                 
                                                    <td>{aux}</td>                                             
                                                    <td><button>Abrir</button><button>Alterar</button></td>
                                                </tr>                          
                                            )
                                            
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    );
}