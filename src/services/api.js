import { config } from '../config/config';

const API_URL = config.api.baseUrl;

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const defaultHeaders = {
    'Content-Type': 'application/json'
};

export const apiService = {
    // Autoryzacja
    login: (credentials) => fetch(`${API_URL}${config.api.endpoints.login}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(credentials)
    }),

    register: (userData) => fetch(`${API_URL}${config.api.endpoints.register}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(userData)
    }),

    // Kategorie
    getCategories: () => fetch(`${API_URL}${config.api.endpoints.categories}`, {
        headers: getAuthHeader()
    }),

    // Komponenty
    getComponents: () => fetch(`${API_URL}${config.api.endpoints.components}`),
    
    getComponent: (id) => fetch(`${API_URL}${config.api.endpoints.component}/${id}`),
    
    addComponent: (componentData) => fetch(`${API_URL}${config.api.endpoints.addComponent}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(componentData)
    }),

    editComponent: (componentData) => fetch(`${API_URL}${config.api.endpoints.editComponent}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(componentData)
    }),

    removeComponent: (componentId) => fetch(`${API_URL}${config.api.endpoints.removeComponent}`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({ component_id: componentId })
    }),

    // Zestawy
    getBuilds: (username) => fetch(`${API_URL}${config.api.endpoints.builds}/${username}`, {
        headers: {
            ...defaultHeaders, // lista typowych naglowkow
            ...getAuthHeader() // naglowek autoryzacji
        }
    }),
    
    addBuild: (buildData) => fetch(`${API_URL}${config.api.endpoints.addBuild}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(buildData)
    }),

    deleteBuild: (buildId) => fetch(`${API_URL}${config.api.endpoints.builds}/${buildId}`, {
        method: 'DELETE',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        }
    }),

    updateBuild: (buildData) => fetch(`${API_URL}${config.api.endpoints.updateBuild}`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        },
        body: JSON.stringify(buildData)
    }),

    addComponentToBuild: (data) => fetch(`${API_URL}${config.api.endpoints.buildComponent.add}`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        },
        body: JSON.stringify(data)
    }),

    removeComponentFromBuild: (buildId, componentId) => fetch(`${API_URL}${config.api.endpoints.buildComponent.remove}`, {
        method: 'DELETE',
        headers: {
            ...defaultHeaders,
            ...getAuthHeader()
        },
        body: JSON.stringify({ buildId, componentId })
    })
}; 