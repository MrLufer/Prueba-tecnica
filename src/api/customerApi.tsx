import axios from 'axios';
const baseURL = 'https://reto01-api-pg-node-express.herokuapp.com/api';

const customerApi = axios.create({baseURL});

export default customerApi;
