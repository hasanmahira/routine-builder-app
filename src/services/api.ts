import axios from 'axios';

const API_URL = 'https://your-backend-api.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signUp = async (email: string, password: string) => {
  const response = await api.post('/auth/signup', { email, password });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
};

export const fetchRoutines = async (userId: string) => {
  const response = await api.get(`/routines/${userId}`);
  return response.data;
};

export const createRoutine = async (userId: string, routine: any) => {
  const response = await api.post(`/routines/${userId}`, routine);
  return response.data;
};

export const updateRoutine = async (userId: string, routineId: string, routine: any) => {
  const response = await api.put(`/routines/${userId}/${routineId}`, routine);
  return response.data;
};

export const deleteRoutine = async (userId: string, routineId: string) => {
  const response = await api.delete(`/routines/${userId}/${routineId}`);
  return response.data;
};