const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 5000;
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IngetinGw API",
            description: "API documentation for Reminder service"
        },
        servers: [
            { url: `http://localhost:${PORT}/api` }
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
