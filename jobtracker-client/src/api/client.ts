import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:7001/api',
});

export default client;