import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const equiposAPI = {
  getAll: () => api.get('/equipos'),
  getById: (id) => api.get(`/equipos/${id}`),
  create: (data) => api.post('/equipos', data),
  update: (id, data) => api.put(`/equipos/${id}`, data),
  remove: (id) => api.delete(`/equipos/${id}`),
}

export const gruposAPI = {
  getAll: () => api.get('/grupos'),
  getById: (id) => api.get(`/grupos/${id}`),
  create: (data) => api.post('/grupos', data),
  update: (id, data) => api.put(`/grupos/${id}`, data),
  remove: (id) => api.delete(`/grupos/${id}`),
  generar: (cantidad_grupos) => api.post('/grupos/generar', { cantidad_grupos }),
  save: (data) => api.post('/grupos/save', data),
}
