/// <reference types="vite/client" />

const API_PORT = import.meta.env.VITE_API_PORT || 3000;
const  API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${API_PORT}`;
export { API_BASE_URL };
