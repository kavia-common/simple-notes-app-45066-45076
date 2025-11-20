const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple Notes API',
      version: '1.0.0',
      description: 'CRUD API for a simple notes app',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Local' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
