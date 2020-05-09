const path = require('path');

module.exports = {
    openapi: '3.0.0',
    info: {
        // API informations (required)
        title: 'Helm Rest API', // Title (required)
        apiVersion: process.env.API_VERSION,
        version: process.env.BUILD_VERSION, // Version (required)
        description: `API Version: ${process.env.API_VERSION}, Build Version: ${process.env.BUILD_VERSION}`, // Description (optional)
    },
    servers: [
        {
            url: `/${process.env.API_VERSION || ""}`
        }
    ],
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};
