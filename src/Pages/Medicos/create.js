import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {backAPI, viacepAPI} from '../../services/api';
import { toast } from "react-toastify";

export default function MedicosCreate() {

    let history = useHistory();
   
    const token = sessionStorage.getItem("Token");  

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const [ specialityOptions, setSpecialityOptions ] = useState({dataSpeciality: []})

    const initialValues = {
        name: "",
        register: "",
        phone: "",
        cellphone: "",
        email: "",
        specialitiesId: 1,
        zip_code: "",
        address: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        login: "",
        password: "",
    }

    const validations = Yup.object().shape({
        name: Yup.string().required('É necessário informar o nome'),
        register: Yup.string().required('É necessário informar o registro do médico'),
        phone: Yup.string(),
        cellphone: Yup.string(),
        email: Yup.string().email('É necessário informar um e-mail válido'),
        specialitiesId: Yup.number().required(),

        zip_code: Yup.string().required('É necessário informar um CEP'),
        address: Yup.string().required('É necessário informar o endereço'),
        number: Yup.string().required('É necessário informar o número'),
        complement: Yup.string(),
        neighborhood: Yup.string().required('É necessário informar o bairro'),
        city: Yup.string().required('É necessário informar a cidade'),
        state: Yup.string().required('É necessário informar o estado'), 
        
        login: Yup.string().required("É necessário informar o login").max(20, "O Login pode ter no máximo 20 caracteres"),
        password: Yup.string().required("É necessário informar uma senha").min(6, "A senha precisa ter no mínimo 6 caracteres")
    });

    const handleSubmit = values => {
        values.register = values.register.toUpperCase();
       
        backAPI.post('/medicos', values, config).then(
            response => {
                console.log(response.status);
                if(response.status === 201){                    
                    toast.success(`Médico cadastrado com Sucesso !`, { 
                        onClose: () => history.push('/medicos'),                                    
                        position: "top-right",
                        autoClose: 2000,
                        pauseOnHover: false
                    })
                    
                }else{
                    toast.error(response.data.error, {
                        position: "top-right",
                        autoClose: 3000,
                        pauseOnHover: false
                    });
                }
            }
        )
    }

    function handleBlur(event, setFieldValue) {
        let cep = event.replace(/[^0-9]/g, '');
         
        viacepAPI.get(cep+'/json/').then(
            response => {
                 console.log(response.data) 
                 if (response.status === 400){
                     toast.error("Cep Inválido", {
                         position: "top-right",
                         autoClose: 3000,
                         pauseOnHover: false
                     });
                 }else if(response.data.erro == true){
                     toast.error("Cep não encontrado", {
                         position: "top-right",
                         autoClose: 3000,
                         pauseOnHover: false
                     });
                 }else{                    
                     setFieldValue('address', response.data.logradouro)
                     setFieldValue('neighborhood', response.data.bairro)
                     setFieldValue('city', response.data.localidade)
                     setFieldValue('state', response.data.uf)                    
                 }
            }
        )
         
     }

     function backListMedicos(){      
        history.push('/medicos');
    }



    useEffect(() => {      
        backAPI.get('/especialidades', config).then(
            response => {
                console.log(response.data)                    
                setSpecialityOptions({dataSpeciality: response.data});                           
            }
          )
               
    },[]);

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
                                            <h4 class="card-title">Cadastrar Novo Médico</h4>                                                
                                        </div>
                                        <div class="card-body"> 

                                            <Formik  initialValues={initialValues}  onSubmit={handleSubmit} validationSchema={validations} >
                                                {({setFieldValue}) => (
                                                    <Form>
                                                                            
                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="name" class="">Nome*</label>                                                  
                                                                    <Field name="name" id="name" type="text" className="form-control"/> 
                                                                    <ErrorMessage component="span" name="name" />                                                                     
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="register" class="">Registro*</label>
                                                                    <Field name="register" id="register" type="text" className="form-control"/>
                                                                    <ErrorMessage component="span" name="register"/>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="phone" class="">Telefone</label>
                                                                    <Field name="phone" id="phone" type="text" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="phone" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="cellphone" class="">Celular</label>
                                                                    <Field name="cellphone" id="cellphone" type="text" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="cellphone" />
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="email" class="">E-mail</label>
                                                                    <Field name="email" id="email"  type="text" className="form-control" />
                                                                    <ErrorMessage component="span" name="email" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="specialitiesId" class="">Especialidade*</label>
                                                                    <Field as='select' name="specialitiesId" id="specialitiesId" className="form-control">                                                                             
                                                                        {                                                            
                                                                            specialityOptions.dataSpeciality.map(option =>{                                                        
                                                                                return(                                                                                                                     
                                                                                    <option key={option.id} value={option.id}>
                                                                                        {option.description}
                                                                                    </option>                                                              
                                                                                )
                                                                            })
                                                                        }                                                                       
                                                                    </Field>
                                                                    <ErrorMessage component="span" name="specialitiesId" />
                                                            </div>
                                                        </div>
                                            

                                                        <div class="card-header ">
                                                            <h4 class="card-title">Dados do Endereço</h4>                                            
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="zip_code" class="">CEP*</label>
                                                                    <Field name="zip_code" id="zip_code" maxlength="8" type="text" onBlur={(e) => handleBlur(e.currentTarget.value, setFieldValue)} className="form-control" />                                
                                                                    <ErrorMessage component="span" name="zip_code" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="number" class="">Número*</label>
                                                                    <Field name="number" id="number" type="text" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="number" />
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-12">                                
                                                                    <label for="address" class="">Endereço*</label>
                                                                    <Field name="address" id="address" type="text" className="form-control" />                                
                                                                    <ErrorMessage component="span" name="address" />
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="neighborhood" class="">Bairro*</label>
                                                                    <Field name="neighborhood" id="neighborhood" type="text" className="form-control" />                                
                                                                    <ErrorMessage component="span" name="neighborhood" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="complement" class="">Complemento</label>
                                                                    <Field name="complement" id="complement" type="text" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="complement" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="city" class="">Cidade*</label>
                                                                    <Field name="city" id="city" type="text" className="form-control" />                                
                                                                    <ErrorMessage component="span" name="city" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="state" class="">Estado*</label>
                                                                    <Field name="state" id="state" type="text" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="state" />
                                                            </div>
                                                        </div>

                                                        <div class="card-header ">
                                                            <h4 class="card-title">Credenciais de Acesso</h4>                                                
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-md-6">                                
                                                                    <label for="login" class="">Login*</label>
                                                                    <Field name="login" id="login" type="text" maxlength="20" className="form-control" />                                
                                                                    <ErrorMessage component="span" name="login" />
                                                            </div>
                                                            <div class="col-md-6">                                
                                                                    <label for="password" class="">Senha*</label>
                                                                    <Field name="password" id="password" type="password" className="form-control"/>                                
                                                                    <ErrorMessage component="span" name="password" />
                                                            </div>
                                                        </div>


                                                        <div class="row col-md-12">
                                                            <button type="submit" class="btn btn-info btn-fill pull-right">Salvar</button>
                                                            <button type="button" onClick={backListMedicos} class="btn btn-info btn-fill pull-right">Voltar</button>                        
                                                        </div>
                                                    </Form>
                                                )}
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