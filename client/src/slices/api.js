import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_URL

const getAuthHeaders = () => ({
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
})

// Task APIs
export const fetchTasks = (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return axios.get(`${API_BASE_URL}/task?${queryString}`, {
        headers: getAuthHeaders()
    })
}

export const addTask = (task) => axios.post(`${API_BASE_URL}/task`, task, {
    headers: getAuthHeaders()
})

export const getTask = (id) => axios.get(`${API_BASE_URL}/task/${id}`, {
    headers: getAuthHeaders()
})

export const updateTask = (id, task) => axios.patch(`${API_BASE_URL}/task/${id}`, task, {
    headers: getAuthHeaders()
})

export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/task/${id}`, {
    headers: getAuthHeaders()
})

export const getTaskStats = () => axios.get(`${API_BASE_URL}/task/stats`, {
    headers: getAuthHeaders()
})

// Auth APIs
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/auth/login`, credentials)

export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData)