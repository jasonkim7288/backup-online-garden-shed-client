import axios from 'axios';

export default axios.create({
  baseURL: 'https://garden-shed.herokuapp.com',
  timeout: 10000,
  withCredentials: true
})