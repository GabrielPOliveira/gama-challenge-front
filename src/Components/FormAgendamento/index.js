import React from "react";
import { useHistory, Link } from "react-router-dom";
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'; 
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';


export default function FormPacientes() {

    return (
        <div class="col-md-12">
                 <div class="card">                
                    <div class="card-header ">
                        <h4 class="card-title">Cadastrar Novo Agendamento</h4>                        
                    </div>
                    <div class="card-body"> 
                        <form>
                                                
                            <div class="row">
                                <div class="col-md-6">                                
                                        <label for="name" class="">Nome do Paciente</label>
                                        <input id="name" name="name" type="text" class="form-control" value=""/>                                
                                </div>
                                <div class="col-md-6">                                
                                        <label for="" class="">CPF</label>
                                        <input id = "cpf"type="text" class="form-control" value=""/>                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">                                
                                        <label for="data" class="">Data</label>
                                        <input id="time" type="date" class="form-control"  value=""/>

                                </div>
                                <div class="col-md-6">                                
                                        <label for="hora" class="">Hora</label>
                                        <input id="hora" type="time" class="form-control" value=""/>                                
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">                                
                                        <label for="medico" class="">Médico</label>
                                        <input id= "medico" type="text" class="form-control" value=""/>                                
                                </div>
                                <div class="col-md-6">                                
                                        <label for="valor" class="">Valor da Consulta</label>
                                        <input id="valor" type="text" class="form-control"  value=""/>                                
                                </div>
                            </div>

                            <div class="row col-md-12">
                                <button type="submit" class="btn btn-info btn-fill pull-right">Salvar</button>
                                <button type="submit" class="btn btn-info btn-fill pull-right">Voltar</button>                        
                            </div>
                        </form>
                    </div>  
                </div>

        </div>
    );

}
