import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { backAPI } from '../../services/api'
import { ErrorMessage, Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { toast } from "react-toastify";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../NaviBar";
import jwt_decode from 'jwt-decode'

export default function FormAgendamento() {

    let history = useHistory();

    const [client, setClient] = useState({ dataClient: [] });
    const [doctor, setDoctor] = useState({ dataDoctor: [] });
    const [docId, setDocId] = useState(0)

    useEffect(() => {
        backAPI.get('/clientes', { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } })
        .then(response => {
            setClient({ dataClient: response.data });
        });
        
        backAPI.get('/medicos', { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } })
        .then(response => {
            setDoctor({ dataDoctor: response.data });
            
        })
        
        setDocId(jwt_decode(sessionStorage.getItem('Token')).type)
    }, []);

    const initalState = {
        scheduling_day: "",
        scheduling_hour: "",
        value: "",
        clientsId: 0,
        doctorsId: docId,
        appointments_statusId: 1
    }

    const validations = Yup.object().shape({
        scheduling_day: Yup.string().required('Por favor, informe o dia do atendimento.'),
        scheduling_hour: Yup.string().required('Por favor, informe a hora do atendimento'),
        value: Yup.number().min(0, 'O valor não pode ser negativo').required('Por favor, informe o valor da consulta'),
        clientsId: Yup.number().min(1, 'Por favor, selecione um paciente'),
        doctorsId: Yup.number().min(1, 'Por favor, selecione um médico'),
        appointments_statusId: Yup.string()

    });

    const handleSubmit = async (values) => {

        const dataAppoint = {
            scheduling_date: values.scheduling_day + ' ' + values.scheduling_hour,
            value: Number(values.value),
            clientsId: Number(values.clientsId),
            doctorsId: Number(values.doctorsId),
            appointments_statusId: 1
        };

        console.log(dataAppoint);

        const res = await backAPI.post('/agendarConsulta', dataAppoint, { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } });

        setClient({dataClient: []});
        setDoctor({dataDoctor: []});

        if (res.status === 201) {

            toast.success(`Agendamento cadastrado com sucesso`, {
                onClose: () => {history.goBack()},
                position: "top-center",
                autoClose: 1500,
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
        <div>
            <div class="wrapper">
                <HeadersPrivate />
                <div class="main-panel">
                    <NaviBar />
                    <div class="content">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header ">
                                            <h4 class="card-title">Cadastrar Novo Agendamento</h4>
                                        </div>
                                        <div class="card-body">

                                            <Formik enableReinitialize initialValues={initalState} onSubmit={(values, { resetForm }) => {
                                                handleSubmit(values);
                                                resetForm();
                                            }}
                                                validationSchema={validations} >
                                                <Form>

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="name" class="">Nome do Paciente</label>
                                                            <Field as='select' name="clientsId" id="pacientes" class="form-control">
                                                                <option value="" label="Selecione um paciente" />
                                                                {
                                                                    client.dataClient.map(cliente => {
                                                                        return (
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
                                                            <Field name="value" id="value" type="number" min="0" className="form-control" />
                                                            <ErrorMessage component="span" name="value" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="status" class="">Status do agendamento</label>
                                                            <Field  name="appointments_statusId" id="status" className="form-control" value="Agendado" disabled />                                                        
                                                                
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="data" class="">Data</label>
                                                            <Field name="scheduling_day" id="scheduling_day" type="date" min={new Date().toISOString().slice(0, 10)} className="form-control" />
                                                            <ErrorMessage component="span" name="scheduling_day" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="hora" class="">Hora</label>
                                                            <Field name="scheduling_hour" id="scheduling_hour" type="time" className="form-control" />
                                                            <ErrorMessage component="span" name="scheduling_hour" />
                                                        </div>

                                                    </div>

                                                    <div class="row col-md-12">
                                                        <button type="submit" class="btn btn-info btn-fill pull-right">Salvar</button>
                                                        <button type="button" onClick={() => window.history.back()} class="btn btn-info btn-fill pull-right">Voltar</button>
                                                    </div>

                                                </Form>
                                            </Formik>
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
