import axios from 'axios';

const backAxios = axios.create({
    baseURL: 'https://labteam-api.herokuapp.com',
    validateStatus: () => true
});

export default backAxios