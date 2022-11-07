import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_QUIZ_APP_API,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('sesstion_token')}`,
    Accept: "application/json",
    timeout : 1000,
  }
});;