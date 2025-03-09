const API_URL = 'http://localhost:5000';

const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const apiService = {
    // Autoryzacja
    login: (credentials) => fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }),

    register: (userData) => fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    }),

    // Kategorie
    getCategories: () => fetch(`${API_URL}/categories`, {
        headers: getAuthHeader()
    }),

    // Komponenty
    getComponents: () => fetch(`${API_URL}/components`),
    
    getComponent: (id) => fetch(`${API_URL}/component/${id}`),
    
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