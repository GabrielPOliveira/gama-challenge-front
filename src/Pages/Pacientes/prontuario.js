import React, {useState, useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import {backAPI} from '../../services/api';


export default function Prontuario() { 

    let history = useHistory();
    const token = sessionStorage.getItem("Token");

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    // const [paciente, setPacientes] = useState([])

    const [medicos, setMedicos] = useState([])


    const prontuario = history.location.state.detail;
    const uuidPaciente = history.location.state.uuidPaciente;

    // console.log(prontuario.medicalRecord.MedicalHistories);
    // console.log(paciente.data.BloodType.type);

    // const initialValues = {       
    //     name: paciente.name,
    //     cpf: paciente.cpf,       
    //     bloodtype: paciente.data.BloodType.type,
    //     opening_date: prontuario.medicalRecord.opening_date,              
    // }

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
                console.log(prontuario);
            }
        )

        backAPI.get(`/medicos`, config).then(
            response => {
                setMedicos({data: response.data});

                // medicos.data.map(medico => {
                //     console.log(medico.id);
                //     if(medico.id == )
                // })
                                
                console.log(medicos.data);
            }
        )
            // if(!prontuario.medicalRecord.MedicalHistories.length == 0){
            //    alert('TESTE');
            // }
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
                                                    <h4 class="card-title">Prontuário do Pacientes</h4>

                                                    <button class="btn btn-blue" onClick={backListPacientes}>Voltar</button>
                                                </div>
                                                <div class="card-body"> 
                                                    <div class="row">
                                                        <div class="col-md-6"> 
                                                            <label for="name" class="">Nome</label>                                                  
                                                            <input value={dataProntuario.name} name="name" id="name" type="text" className="form-control" disable/> 
                                                        </div>
                                                        <div class="col-md-6"> 
                                                            <label for="cpf" class="">CPF</label>
                                                            <input value={dataProntuario.cpf} name="cpf" id="cpf" type="text" maxlength="11" className="form-control"/>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-md-6"> 
                                                            <label for="opening_date" class="">Data de Abertura do Prontuário</label>                                                  
                                                            <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                        </div>
                                                        <div class="col-md-6"> 
                                                        <label for="opening_date" class="">Tipo Sanguíneo</label>                                                  
                                                            <input value={dataProntuario.bloodtype} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                        </div>
                                                    </div>
                                                
                                                    {
                                                        (!prontuario.medicalRecord.MedicalHistories.length == 0) ? 
                                                        (
                                                            
                                                            prontuario.medicalRecord.MedicalHistories.map(item =>{
                                                                return(
                                                                    <div> 
                                                                        <div class="row">
                                                                                <div class="col-md-6"> 
                                                                                    <label for="opening_date" class="">Data</label>                                                  
                                                                                    <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                                                </div>
                                                                                <div class="col-md-6"> 
                                                                                    <label for="opening_date" class="">Nome do médico</label>                                                  
                                                                                    <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                                                </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12"> 
                                                                                <label for="opening_date" class="">Descrição</label>                                                  
                                                                                <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })

                                                        ) : (
                                                                <div> 
                                                                     <div class="row">
                                                                                <div class="col-md-6"> 
                                                                                    <label for="opening_date" class="">Data</label>                                                  
                                                                                    <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                                                </div>
                                                                                <div class="col-md-6"> 
                                                                                    <label for="opening_date" class="">Nome do médico</label>                                                  
                                                                                    <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
                                                                                </div>
                                                                        </div>
                                                                    <div class="row">
                                                                            <div class="col-md-12"> 
                                                                                <label for="opening_date" class="">Descrição</label>                                                  
                                                                                <input value={dataProntuario.opening_date} name="opening_date" id="opening_date" type="text" className="form-control" disable/> 
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
            </div>
        </div>
                            



    );


}