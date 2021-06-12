import axios from 'axios';

export const backAxios = axios.create({
    baseURL: 'https://labteam-api.herokuapp.com',
    validateStatus: () => true
});

export const viacepAPI = axios.create({
    baseURL: 'https://viacep.com.br/ws/',
    validateStatus: () => true
});