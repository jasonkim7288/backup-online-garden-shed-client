import axios from 'axios';

export default axios.create({
  baseURL: 'https://garden-shed.herokuapp.com',
  // baseURL: 'http://localhost:8080',
  timeout: 10000,
  withCredentials: true
})