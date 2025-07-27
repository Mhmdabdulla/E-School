import axios from "axios";
import store  from "../redux/store";
import { refreshToken } from "../services/authServices";
import {logout  } from '../redux/slices/authSlice'

const apiClient = axios.create({ 
  baseURL:import.meta.env.VITE_BASE_URL,
  withCredentials: true, 
  
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = (store.getState() as { auth: { accessToken: string } }).auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newAccessToken = await refreshToken(store.dispatch);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      } catch {
        console.error("Session expired. Please log in again.");
        store.dispatch(logout());
        localStorage.clear()
        
      }
    }

    if (error.response.status === 403) {
      console.error("You do not have permission to access this resource.");
      localStorage.clear()
      store.dispatch(logout()); 
      return Promise.reject(error); 
    }

    return Promise.reject(error);
  }
);

export default apiClient ;