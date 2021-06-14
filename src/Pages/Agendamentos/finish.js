import { useHistory } from "react-router-dom";
import {convertToRaw, Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import HeadersPrivate from "../../Components/HeaderPrivate";
import NaviBar from "../../Components/NaviBar";
import './styles.css'
import moment from "moment";
import { backAPI } from "../../services/api";
import { toast } from "react-toastify";


export default function FinishAgendamento(){

    let history = useHistory();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

    const initialValues = {
        clientsId: history.location.state.detail.clientsId,
        clientName: history.location.state.detail.Client.name,
        doctorsId: history.location.state.detail.doctorsId
    }

    const uuid = history.location.state.detail.uuid
    
    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('Token')}`
        }
    }

    const handleSubmit = async () => {
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const description = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        
        const aux = new Date();
        const appointment_date = moment(aux).format("YYYY/MM/DD HH:mm") 

        const endAppoint = {
            description,
            appointment_date,
            clientsId: initialValues.clientsId,
            doctorsId: initialValues.doctorsId,
            appointments_statusId: 2
        }

        console.log(endAppoint)

        const res = await backAPI.post(`/realizarConsulta/${uuid}`, endAppoint, config);

        console.log(res)

        if (res.status === 201){
            toast.success('Consulta realizada com sucesso', {
                onClose: () => {history.goBack()},
                autoClose: 1500
            });
            
        } else {
            toast.error('Não foi possível realizar a consulta', {
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
                                    <div class="card" >
                                        <div class="card-header">
                                            <h4 class="card-title" style={{ textAlign: "center", fontWeight: "bold" }}>Realizar Consulta</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="textBox" style={{textIndent: "10px"}}>
                                <Editor editorState={editorState} onChange={setEditorState} placeholder="Descreva o caso..." />
                            </div>
                            <button id="butao" onClick={handleSubmit}>Finalizar</button>
                            <button id="butao2" onClick={() => {history.goBack()}}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

