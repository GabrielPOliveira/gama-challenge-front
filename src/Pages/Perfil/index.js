import jwt_decode from 'jwt-decode'
import { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik, Field } from 'formik'
import * as Yup from 'yup';
import HeadersPrivate from '../../Components/HeaderPrivate'
import NaviBar from '../../Components/NaviBar';
import { toast } from "react-toastify";
import { backAPI } from '../../services/api';
import { useHistory } from 'react-router-dom';


export default function Perfil(){

    const [id, setId] = useState(0);
    const [login, setLogin] = useState("");

    let history = useHistory();

    useEffect(() => {

        setId(jwt_decode(sessionStorage.getItem('Token')).id)
        setLogin(jwt_decode(sessionStorage.getItem('Token')).login)
    });

    const initialState = {
        login,
        currentPassword: "",
        password: "",
        passwordConfirmation: ""
    }

    const validations = Yup.object().shape({
        currentPassword: Yup.string().required('Por favor, insira a senha atual'),
        password: Yup.string().min(6, 'A senha deve possuir no mínimo 6 caracteres').when('currentPassword', (currentPassword, schema) => {
            return currentPassword ? schema.required('Por favor, insira a nova senha') : schema
        }),
        passwordConfirmation: Yup.string().when('password', (password, schema) => { 
            return password ? schema.required('Por favor, confirme a nova senha').oneOf([Yup.ref('password'), null], 'As senhas não correspondem') : schema 
        })
    })
    

    const handleSubmit = async (values) => {

        const dataUser = {
            id,
            currentPassword: values.currentPassword,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
        };

        const res = await backAPI.put('/usuario/atualizar', dataUser, { headers: { Authorization: `Bearer ${sessionStorage.getItem('Token')}` } });
        
        if (res.status === 200) {

            toast.success(`Senha alterada com sucesso`, {
                onClose: () => {history.goBack()},
                autoClose: 1500,
                pauseOnHover: false
            })
            
        } else {
            toast.error('Não foi possível alterar a senha', {
                position: "top-right",
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
                                            <h4 class="card-title">Alterar senha</h4>
                                        </div>
                                        <div class="card-body">
                                            <Formik enableReinitialize initialValues={initialState} onSubmit={(values, { resetForm }) => {
                                                handleSubmit(values);
                                                resetForm();
                                            }} validationSchema={validations} >
                                                <Form>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="name" class="">Login do usuário</label>
                                                            <Field name="login" id="login" class="form-control" disabled />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="medico" class="">Senha atual</label>
                                                            <Field name="currentPassword" id="currentPassword" class="form-control" />
                                                            <ErrorMessage component="span" name="currentPassword" />
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <label for="name" class="">Nova senha</label>
                                                            <Field name="password" id="password" class="form-control" />
                                                            <ErrorMessage component="span" name="password" />
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label for="medico" class="">Confirmar nova senha</label>
                                                            <Field name="passwordConfirmation" id="passwordConfirmation" class="form-control" />
                                                            <ErrorMessage component="span" name="passwordConfirmation" />
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
    )
}