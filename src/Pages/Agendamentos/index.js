import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import FormAgendamento from "../../Components/FormAgendamento"
import ListAgendamentos from "../../Components/ListAgendamentos";
import api from '../../services/api'

export default function Agendamentos(){
    
    return (
        <div>
            <div class="wrapper">
               
               
            <HeadersPrivate />
                <div class="main-panel">                
                <NaviBar />                    
                <FormAgendamento />

                <ListAgendamentos />

                </div>
            </div>
        </div>
    )
}