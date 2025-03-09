export const config = {
    api: {
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
        endpoints: {
            login: '/login',
            register: '/register',
            components: '/components',
            component: '/component',
            builds: '/build',
            categories: '/categories'
        }
    },
    app: {
        version: process.env.REACT_APP_VERSION || '1.0.0',
        environment: process.env.REACT_APP_ENV || 'development',
        jwtExpiry: process.env.REACT_APP_JWT_EXPIRY || '86400'
    }
}; 