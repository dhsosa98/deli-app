/// <reference types="vite/client" />

const API_PORT = import.meta.env.VITE_API_PORT || 3000;
let  API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://localhost:${API_PORT}`;
if (import.meta.env.PROD){
    API_BASE_URL = `/`;
}
export { API_BASE_URL };
