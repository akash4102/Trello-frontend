import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trello-backend-lyart.vercel.app/api/v1',
  withCredentials: true,
});

export default api;
