import axios from 'axios';
const baseURL = 'https://jsonplaceholder.typicode.com';

const typicodeApi = axios.create({baseURL});

export default typicodeApi;
