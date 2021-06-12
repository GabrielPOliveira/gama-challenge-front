import React, {useEffect, useRef, useState} from "react";
import { useHistory } from "react-router";
import {backAxios} from '../../services/api'
import { ErrorMessage, Form, Formik, Field} from 'formik'
import * as Yup from 'yup'
import { toast } from "react-toastify";

export default function FormPacientes() {
    
    let history = useHistory();
    
    const [client, setClient] = useState({dataClient: []});
    const [doctor, setDoctor] = useState({dataDoctor: []});
    
    useEffect(() => {
        backAxios.get('/clientes', { headers: {Authorization: `Bearer ${sessionStorage.getItem('Token')}`}})
            .then(response => {
                setClient({dataClient : response.data});
            });

        backAxios.get('/medicos', { headers: {Authorization: `Bearer ${sessionStorage.getItem('Token')}`}})
            .then(response => {
                setDoctor({dataDoctor: response.data});
            })
    }, []);

    const initalState = {
        scheduling_day: "",
        scheduling_hour: "",
        value: "",
        clientsId: 0,
        doctorsId: 0,
        appointments_statusId: 0
    }

    const validations = Yup.object().shape({
        scheduling_day: Yup.string().required('Por favor, informe o dia do atendimento.'),
        scheduling_hour: Yup.string().required('Por favor, informe a hora do atendimento'),
        value: Yup.number().min(0, 'O valor não pode ser negativo').required('Por favor, informe o valor da consulta'),
        clientsId: Yup.number(),
        doctorsId: Yup.number(),
        appointments_statusId: Yup.number(),
              
    });

    const handleSubmit = async (values) => {
        
        const dataAppoint = {
            scheduling_date: values.scheduling_day + ' ' + values.scheduling_hour,
            value: Number(values.value),
            clientsId: Number(values.clientsId),
            doctorsId: Number(values.doctorsId),
            appointments_statusId: values.appointments_statusId
        };

        console.log(dataAppoint);
    
        const res = await backAxios.post('/agendarConsulta', dataAppoint, {headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}`}});

        if (res.status === 201){

            toast.success(`Agendamento realizado com sucesso`, {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: false
            })
        } else {
            toast.error('Não foi possível realizar o agendamento', {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: false
            });
        }
    };

    return (
        <div class="col-md-12">
                 <div class="card">                
                    <div class="card-header ">
                        <h4 class="card-title">Cadastrar Novo Agendamento</h4>                        
                    </div>
                    <div class="card-body"> 

                    <Formik enableReinitialize initialValues={initalState} onSubmit={(values, {resetForm}) => {
                        handleSubmit(values);
                        resetForm();
                        }} 
                        validationSchema={validations} > 
                        <Form>

                            <div class="row">
                                <div class="col-md-6">
                                    <label for="name" class="">Nome do Paciente</label>                          
                                    <Field as='select' name="clientsId" id="pacientes" class="form-control">
                                        <option value="" label="Selecione um paciente"/>
                                        {
                                            client.dataClient.map(cliente => {
                                                return(
                                                    <option key={cliente.id} value={cliente.id}> {cliente.name} </option>
                                                )
                                            })
                                        }
                                    
                                    </Field>
                                </div>
                                <div class="col-md-6">
                                    <label for="medico" class="">Médico</label>
                                    <Field as='select' name="doctorsId" id="medicos" class="form-control">
                                        <option value="" label="Selecione um médico" />
                                        {
                                            doctor.dataDoctor.map(medico => {
                                                return (
                                                    <option key={medico.id} value={medico.id}> {medico.name} </option>
                                                )
                                            })
                                        }
                                    </Field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="valor" class="">Valor da Consulta</label>
                                    <Field name="value" id="value" type="number" min="0" className="form-control"/>
                                    <ErrorMessage component="span" name="value" />
                                </div>
                                <div class="col-md-6"> 
                                    <label for="status" class="">Status do agendamento</label>
                                    <Field as="select" name="appointments_statusId" id="status" className="form-control">
                                        <option value="" selected="selected">Selecione um status</option>
                                        <option key={1} value={1}> Agendado </option>
                                        <option key={2} value={2}> Cancelado </option>
                                    </Field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="data" class="">Data</label>
                                    <Field name="scheduling_day" id="scheduling_day" type="date" className="form-control"/>
                                    <ErrorMessage component="span" name="scheduling_day" />                                    
                                </div>
                                <div class="col-md-6">
                                    <label for="hora" class="">Hora</label>
                                    <Field name="scheduling_hour" id="scheduling_hour" type="time" className="form-control"/>
                                    <ErrorMessage component="span" name="scheduling_hour" />
                                </div>

                            </div>

                            <div class="row col-md-12">
                                <button type="submit" class="btn btn-info btn-fill pull-right">Salvar</button>
                            </div>

                        </Form>
                    </Formik>
                    </div>  
                </div>

        </div>
    );

}
