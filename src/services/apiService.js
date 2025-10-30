import axios from 'axios';
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  
  headers: {
    'Content-Type': 'application/json'
  }
});
//public api
export const registerUser = (dados) => publicApi.post('/user/account', dados);
export const genders = () => publicApi.get('/genders');
//api
export const login = (dados) => api.post('/auth/login', dados) //manter assim por enquanto. está dando conflito com o nome de uma variável interna do component de realizar login
export const checkLogin = () => api.get('/auth/login/check')
export const logout = () => api.post('/auth/login/logout');
export const getUserProfile = (nickname) => api.get(`/user/profile/${nickname}`);
export const postConnection = (data) => api.post('/connection', data);
export const getConnection = (id) => api.get(`/connection/${id}`);
export const getInviteConnections = () => api.get(`/connection/invites`);
export const postAcceptConnection = (dados) => api.post(`/connection/invites`, dados);
export const postNewPost = (dados) => api.post('/post', dados);
export const getPosts = () => api.get('/post');

// Envia a foto de perfil do usuário
export const uploadProfilePhoto = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post('/user/profile/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


//export const getAuthenticatedUser = () => api.get('/user/profile/auth');