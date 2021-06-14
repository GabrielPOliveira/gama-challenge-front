import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom"
import * as Yup from 'yup'
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { toast } from "react-toastify";
import { backAxios } from "../../services/api";
import HeadersPrivate from '../../Components/HeaderPrivate'
import NaviBar from '../../Components/NaviBar'
import moment from "moment";

export default function UpdateAgendamento() {

    let history = useHistory()

    const [client, setClient] = useState({ dataClient: [] });
    const [doctor, setDoctor] = useState({ dataDoctor: [] });

    useEffect(() => {
        backAxios.get('/clientes', { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } })
            .then(response => {
                setClient({ dataClient: response.data });
            });

        backAxios.get('/medicos', { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } })
            .then(response => {
                setDoctor({ dataDoctor: response.data });
            })

        
    }, []);

         
    const scheduling_day =(history.location.state.detail.scheduling_date).substring(0, 10);

    const initialValues = {
        scheduling_day,
        scheduling_hour: moment.utc(history.location.state.detail.scheduling_date).format('HH:mm'),
        value: history.location.state.detail.value,
        clientsId: history.location.state.detail.clientsId,
        doctorsId: history.location.state.detail.doctorsId,
        appointments_statusId: history.location.state.detail.appointments_statusId
    }

    const clientName = history.location.state.detail.Client.name
    const doctorName = history.location.state.detail.Doctor.name
    const uuid = history.location.state.detail.uuid

    const validations = Yup.object().shape({
        scheduling_day: Yup.string().required('Por favor, informe o dia do atendimento.'),
        scheduling_hour: Yup.string().required('Por favor, informe a hora do atendimento'),
        value: Yup.number().min(0, 'O valor não pode ser negativo').required('Por favor, informe o valor da consulta'),
        clientsId: Yup.number(),
        doctorsId: Yup.number(),
        appointments_statusId: Yup.number(),
    });

    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
    }

    const handleUpdate = async (values) => {

        const updateAppoint = {
            scheduling_date: values.scheduling_day + ' ' + values.scheduling_hour,
            value: Number(values.value),
            clientsId: Number(values.clientsId),
            doctorsId: Number(values.doctorsId),
            appointments_statusId: values.appointments_statusId
        };

        console.log(updateAppoint)

        const res = await backAxios.put(`/alterarConsulta/${uuid}`, updateAppoint, config);

        if (res.status === 200){
            toast.success('Agendamento alterado com sucesso', {
                autoClose: 3000
            });
            history.goBack();
        } else {
            toast.error('Não foi possível alterar o agendamento', {
                autoClose: 3000
            })
        }
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
                                    <div class="card">
                                        <div class="card-header ">
                                            <h4 class="card-title" style={{textAlign: "center", fontWeight: "bold"}}>Atualizar Agendamento</h4>
                                        </div>
                                        <div class="card-body">

                                            <Formik enableReinitialize initialValues={initialValues} onSubmit={(values, { resetForm }) => {
                                                handleUpdate(values);
                                                resetForm();
                                            }}
                                                validationSchema={validations} >
                                                <Form>

                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="name" class="">Nome do Paciente</label>
                                                            <Field as='select' name="clientsId" id="pacientes" class="form-control">
                                                                <option value="" label={clientName} />
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
                                                            <Field as='select' name="doctorsId" id="medicos" class="form-control" >
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
                                                            <Field as="select" name="appointments_statusId" id="status" className="form-control">
                                                                <option value="" label="Selecione um status" />
                                                                <option key={1} value={1}> Agendado </option>
                                                                <option key={2} value={3}> Cancelado </option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="data" class="">Data</label>
                                                            <Field name="scheduling_day" id="scheduling_day" type="date" className="form-control" min={new Date().toISOString().slice(0, 10)} />
                                                            <ErrorMessage component="span" name="scheduling_day" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="hora" class="">Hora</label>
                                                            <Field name="scheduling_hour" id="scheduling_hour" type="time" className="form-control" />
                                                            <ErrorMessage component="span" name="scheduling_hour" />
                                                        </div>

                                                    </div>

                                                    <div class="row col-md-12">
                                                        <button type="submit" class="btn btn-info btn-fill pull-right">Atualizar</button>
                                                        <button type="button" onClick={() => history.goBack()} class="btn btn-info btn-fill pull-right">Voltar</button>
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