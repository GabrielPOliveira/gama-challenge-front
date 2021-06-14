import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import { backAPI } from '../../services/api';

export default function Medicos() {

    let history = useHistory();

    const token = sessionStorage.getItem("Token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const [medicos, setMedicos] = useState({ dataMedicos: [] })


    function openForm() {        
        history.push('/medico/criar');
    }

    function UpdateMedico(e) {
        console.log(e);
        backAPI.get(`/medico/${e}`, config).then(
            
            response => {                
                history.push({
                    pathname: '/medico/alterar',
                    state: { detail: response.data },
                    
                });
            }
        )
    }

    useEffect(() => {
        backAPI.get('/medicos', config).then(
            response => {
                setMedicos({ dataMedicos: response.data });
            }
        )
    }, []);

    const [Searchvalue, setState] = useState("") 
    const inputChange = (event) => {       
        setState(event.target.value);
      };

    const filteredList = medicos.dataMedicos.filter((item) => {   
        if (Searchvalue) {                
            if(item.name.toLowerCase().indexOf(Searchvalue.toLowerCase()) > -1){                
                return (item);
            }            
          
        } else {
          return item;
        }
      });

      return (
        <div>
            <div class="wrapper">
                <HeadersPrivate />
                <div class="main-panel">
                    <NaviBar />
                    <div class="content">
                        <div class="container-fluid">
                            <div class="row">
                               
                                {
                                    <div class="col-md-12">
                                         <input
                                            value={medicos.dataMedicos.filterByText}
                                            name="filterByText"
                                            onChange={(e) => {
                                                inputChange(e);
                                            }}
                                            placeholder="Pesquise pelo nome do medico ..."
                                        />
                                        <div class="card strpied-tabled-with-hover">
                                            <div class="card-header ">
                                                <h4 class="card-title">Médicos</h4>

                                                <button class="btn btn-blue" onClick={openForm}>Cadastrar</button>
                                            </div>

                                            <div class="card-body  table-responsive">
                                                <table class="table table-hover table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>E-mail</th>
                                                            <th>Ação</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            //pacientes.dataPacientes
                                                           filteredList.map(option => {
                                                                return (
                                                                    <tr>
                                                                        <td>{option.name}</td>
                                                                        <td>{option.email}</td>
                                                                        <td>

                                                                            <button class="btn btn-blue" onClick={() => UpdateMedico(option.id)} >Alterar</button>                                                                                                                                                    

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );

}