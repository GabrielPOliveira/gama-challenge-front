import axios from 'axios';


export const backAPI = axios.create({
    baseURL: 'https://labteam-api.herokuapp.com',
    validateStatus: () => true
});

export const viacepAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    validateStatus: () => true
});

