const swaggerJSDoc = require("swagger-jsdoc");

const options= (port) = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Reminder API",
      version: "1.0.0",
      description: "API documentation for Reminder service"
    },
    servers: [
      {
        url: `http://localhost:5000/api`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    "./src/routes/*.js"
  ]
};

module.exports = swaggerJSDoc(options);
