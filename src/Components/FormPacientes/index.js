import React, {useState, useEffect} from "react";
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {backAPI, viacepAPI} from '../../services/api';
import { toast } from "react-toastify";

export default function FormPacientes() {
   
    const token = sessionStorage.getItem("Token");  

    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const [ bloodtypeOptions, setbloodtypeOptions ] = useState({dataBloodtypes: []})

    const initialValues = {
        name: "",
        cpf: "",
        phone: "",
        cellphone: "",
        email: "",
        bloodtypesId: 1,
        zip_code: "",
        address: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: ""
    }


    const validations = Yup.object().shape({
        name: Yup.string().required('É necessário informar o nome'),
        cpf: Yup.string().required('É necessário informar um CPF válido'),
        phone: Yup.string(),
        cellphone: Yup.string(),
        email: Yup.string().email('É necessário informar um e-mail válido'),
        bloodtypesId: Yup.number().required(),

        zip_code: Yup.string().required('É necessário informar um CEP'),
        address: Yup.string().required('É necessário informar o endereço'),
        number: Yup.string().required('É necessário informar o número'),
        complement: Yup.string(),
        neighborhood: Yup.string().required('É necessário informar o bairro'),
        city: Yup.string().required('É necessário informar a cidade'),
        state: Yup.string().required('É necessário informar o estado'),                
    });
    
    const handleSubmit = values => {
        alert(JSON.stringify(values));
        backAPI.post('/clientes', values, config).then(
            response => {
                console.log(response.status);
                if(response.status === 201){                    
                    toast.success(`Paciente cadastrado com Sucesso !`, { 
                        onClose: () => {window.location.reload()},                                    
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

    function backListPacientes(){      
        window.location.reload()        
    }
    useEffect(() => {      
        backAPI.get('/tipos', config).then(
            response => {
                console.log(response.data)                    
                setbloodtypeOptions({dataBloodtypes: response.data});                           
            }
          )
               
    },[]);

    return (
        <div class="col-md-12">
            <div class="card">                
                <div class="card-header ">
                    <h4 class="card-title">Cadastrar Novo Paciente</h4>                                                
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
                                            <label for="cpf" class="">CPF*</label>
                                            <Field name="cpf" id="cpf" type="text" maxlength="11" className="form-control"/>
                                            <ErrorMessage component="span" name="cpf" />
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
                                            <label for="bloodtypesId" class="">Tipo Sanguíneo*</label>
                                            <Field as='select' name="bloodtypesId" id="bloodtypesId" className="form-control">                                                                             
                                                {                                                            
                                                    bloodtypeOptions.dataBloodtypes.map(option =>{                                                        
                                                        return(                                                                                                                     
                                                            <option key={option.id} value={option.id}>
                                                                {option.type}
                                                            </option>                                                              
                                                        )
                                                    })
                                                }
                                            </Field>
                                            <ErrorMessage component="span" name="bloodtypesId" />
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

                                <div class="row col-md-12">
                                    <button type="submit" class="btn btn-info btn-fill pull-right">Salvar</button>
                                    <button type="button" onClick={backListPacientes} class="btn btn-info btn-fill pull-right">Voltar</button>                        
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>  
            </div>
        </div>
    );

}
