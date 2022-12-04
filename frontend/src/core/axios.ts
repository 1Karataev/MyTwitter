import axios from 'axios';


axios.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzMzliYjM2MDc3OWE2YWE5N2IyNzljNiIsImVtYWlsIjoibXltYWlsQGFtaWwucnUiLCJmdWxsbmFtZSI6IklvYW5uIiwidXNlcm5hbWUiOiJ1c2VyIiwicGFzc3dvcmQiOiJ1c2VyMTIzIiwiY29uZmlybV9oYXNoIjoiNTUxZjNmYzY0OWFkZWVmNjRkMGJiZDE4ZDBhZjE0Y2UiLCJfX3YiOjB9LCJpYXQiOjE2NjU5MjEwMTIsImV4cCI6MTY2ODUxMzAxMn0.T9SOQOpzs7QStefzcedwFJjbTLFQ-8NNM8eIxu6MPN8'}
 
  return config
})

export {axios}