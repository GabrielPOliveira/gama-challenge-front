import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import {backAPI} from '../../services/api';
import moment from "moment";


export default function Prontuario() { 

    let history = useHistory();
    const token = sessionStorage.getItem("Token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

 

    const prontuario = history.location.state.detail;
    const medicos = history.location.state.medicos;
    const uuidPaciente = history.location.state.uuidPaciente;

    const initialValues = {   
        name: "",
        cpf: "",       
        bloodtype: "",    
        opening_date: prontuario.medicalRecord.opening_date,
        dates: "",        
        doctorsName: "",
        descriptions: "",
                    
    }

    const [dataProntuario, setDataProntuario] = useState(initialValues)

    useEffect(() => {

        backAPI.get(`/cliente/${uuidPaciente}`, config).then(
            response => {
                // setPacientes({data: response.data});
                setDataProntuario({name: response.data.name, cpf: response.data.cpf, bloodtype: response.data.BloodType.type})               
            }
        )

    }, []);
    
    function backListPacientes(){      
        history.push('/pacientes');
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
                                                <div class="card-header ">
                                                    <h4 class="card-title">Prontuário do Paciente</h4>

                                                    <button class="btn btn-blue" onClick={backListPacientes}>Voltar</button>
                                                </div>
                                                <div class="card-body"> 
                                                    <div class="row">
                                                        <div class="col-md-6"> 
                                                            <label for="name" class="">Nome</label>                                                  
                                                            <input value={dataProntuario.name} name="name" id="name" type="text" className="form-control" disabled/> 
                                                        </div>
                                                        <div class="col-md-6"> 
                                                            <label for="cpf" class="">CPF</label>
                                                            <input value={dataProntuario.cpf} name="cpf" id="cpf" type="text" maxlength="11" className="form-control" disabled/>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-6"> 
                                                            <label for="opening_date" class="">Data de Abertura do Prontuário</label>                                                  
                                                            <input value={moment(dataProntuario.opening_date).format('DD/MM/YYYY')} name="opening_date" id="opening_date" type="text" className="form-control" disabled/> 
                                                        </div>
                                                        <div class="col-md-6"> 
                                                        <label for="opening_date" class="">Tipo Sanguíneo</label>                                                  
                                                            <input value={dataProntuario.bloodtype} name="opening_date" id="opening_date" type="text" className="form-control" disabled/> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                    <div class="card-header ">
                                                        <h4 class="card-title">Histórico do Paciente</h4>                                                                            
                                                    </div>
                                                    {
                                                        (!prontuario.medicalRecord.MedicalHistories.length == 0) ? 
                                                        (
                                                            
                                                            prontuario.medicalRecord.MedicalHistories.map(item =>{
                                                               
                                                                let aux = medicos.find(val => val.id == item.doctorsId)
                                                                                                                              
                                                                return(
                                                                    
                                                                    <div className="card strpied-tabled-with-hover"> 
                                                                       
                                                                        <div class="row">
                                                                                <div class="col-md-6"> 
                                                                                    <label for="date" class="">Data</label>                                                  
                                                                                    <input value={moment.utc(item.date).format('DD/MM/YYYY\xa0\xa0\xa0HH:mm')} name="date" id="date" type="text" className="form-control" disabled /> 
                                                                                </div>
                                                                                <div class="col-md-6"> 
                                                                                    <label for="opening_date" class="">Nome do médico</label>                                                  
                                                                                    <input value={aux.name} name="opening_date" id="opening_date" type="text" className="form-control" disabled/> 
                                                                                </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12"> 
                                                                                <label for="description" class="">Descrição</label>                                                  
                                                                                <textarea value={item.description} style={{height: '150px'}} name="description" id="description" type="text" className="form-control" disabled/> 
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })

                                                        ) : (
                                                                <div className="card strpied-tabled-with-hover"> 
                                                                  
                                                                    <div class="row">
                                                                            <div class="col-md-12"> 
                                                                                <p>O Paciente ainda não possui histórico médico</p>
                                                                            </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                        )
                                                    }                                                                                                                                                                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            



    );


}