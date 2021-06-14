import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
// import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import FormPacientes from "../../Components/FormPacientes";
import { backAPI } from '../../services/api';
import { toast } from "react-toastify";

export default function Pacientes() {
    // JS
    let history = useHistory();

    const token = sessionStorage.getItem("Token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const [formCreate, setformCreate] = useState(false);
    const [pacientes, setPacientes] = useState({ dataPacientes: [] })
    const [medicos, setMedicos] = useState([])
    

    function openForm() {        
        setformCreate(true);
    }

    function UpdatePaciente(e){
             
       backAPI.get(`/cliente/${e}`, config).then(
                response => {
                    history.push({
                        pathname: '/paciente/alterar',
                        state: { detail: response.data },
                        
                    });
                }
        )
    }

    function Prontuario(e){
        //Implementar aqui o metodo de prontuario      
      
        backAPI.get(`/cliente/${e}/prontuario`, config).then(
            response => {
                history.push({
                    pathname: '/paciente/prontuario',
                    state: { detail: response.data, uuidPaciente: e, medicos: medicos.data },                    
                });
            }
        )
      

    }

    useEffect(() => {

        backAPI.get(`/medicos`, config).then(
            response => {
                setMedicos({data: response.data});                                              
            }
            
        )
        
        backAPI.get('/clientes', config).then(
            response => {
                setPacientes({ dataPacientes: response.data });
            }
        )
      

    }, []);

    const [Searchvalue, setState] = useState("") 
    const inputChange = (event) => {       
        setState(event.target.value);
      };


    const filteredList = pacientes.dataPacientes.filter((item) => {   
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
    
                           

                                {formCreate ? (
                                    <div>
                                        <FormPacientes />                                        
                                        {/* <button onClick={ () => setformCreate(false)}> fechar </button> */}
                                    </div>
                                ) : (
                                    <div class="col-md-12">
                                         <input
                                            value={pacientes.dataPacientes.filterByText}
                                            name="filterByText"
                                            onChange={(e) => {
                                                inputChange(e);
                                            }}
                                            placeholder="Pesquise pelo nome do paciente ..."
                                        />
                                        <div class="card strpied-tabled-with-hover">
                                            <div class="card-header ">
                                                <h4 class="card-title">Pacientes</h4>

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
                                                                            {/* <button class="btn btn-blue">Abrir</button> */}
                                                                            <button class="btn btn-blue" onClick={() => UpdatePaciente(option.uuid)} >Alterar</button>                                                                         
                                                                            <button class="btn btn-blue" onClick={() => Prontuario(option.uuid)}>Prontuário</button>

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
                                )}
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}