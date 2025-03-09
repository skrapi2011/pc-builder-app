export const config = {
    api: {
        baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
        endpoints: {
            login: '/login',
            register: '/register',
            categories: '/categories',
            components: '/components',
            component: '/component',
            addComponent: '/add',
            editComponent: '/edit',
            removeComponent: '/remove',
            builds: '/build',
            addBuild: '/build/add',
            updateBuild: '/build/update',
            buildComponent: {
                add: '/build/component/add',
                remove: '/build/component/remove'
            }
        }
    },
    app: {
        version: process.env.REACT_APP_VERSION || '1.0.0',
        environment: process.env.REACT_APP_ENV || 'development',
        jwtExpiry: process.env.REACT_APP_JWT_EXPIRY || '86400'
    }
}; 