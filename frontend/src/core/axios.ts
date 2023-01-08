import axios from 'axios';


axios.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
  token: window.localStorage.getItem('token') || ''}
 
  return config
})

export {axios}