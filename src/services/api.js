import { config } from '../config/config';

const API_URL = config.api.baseUrl;

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const apiService = {
    // Autoryzacja
    login: (credentials) => fetch(`${API_URL}${config.api.endpoints.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }),

    register: (userData) => fetch(`${API_URL}${config.api.endpoints.register}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }),

    // Kategorie
    getCategories: () => fetch(`${API_URL}${config.api.endpoints.categories}`, {
        headers: getAuthHeader()
    }),

    // Komponenty
    getComponents: () => fetch(`${API_URL}${config.api.endpoints.components}`),
    
    getComponent: (id) => fetch(`${API_URL}${config.api.endpoints.component}/${id}`),
    
    addComponent: (componentData) => fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(componentData)
    }),

    editComponent: (componentData) => fetch(`${API_URL}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(componentData)
    }),

    removeComponent: (componentId) => fetch(`${API_URL}/remove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ component_id: componentId })
    }),

    // Zestawy
    getBuilds: (username) => fetch(`${API_URL}/build/${username}`),
    
    addBuild: (buildData) => fetch(`${API_URL}/build/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildData)
    }),

    deleteBuild: (buildId) => fetch(`${API_URL}/build/${buildId}`, {
        method: 'DELETE'
    })
}; 