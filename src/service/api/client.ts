import axios from 'axios';

const client = axios.create({
  baseURL: 'https://digital5.ewanfabiani.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;