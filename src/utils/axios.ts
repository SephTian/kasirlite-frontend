import axios from 'axios';

const fetchAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3033',
});

export default fetchAxios;
