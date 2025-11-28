// src/utils/auth.js
import axios from 'axios';

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/login';
};