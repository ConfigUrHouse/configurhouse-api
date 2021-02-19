import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger documentation
 */
const options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: { type: 'apiKey', in: 'header', name: 'Authorization', description: '' },
        value: 'Bearer <JWT>',
      },
    },
  },
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ConfigUrHouse API',
      version: '1.0.3',
      description:
        'To launch request with this documentation you need to send a request to /users/login at the end with the credentials admin/admin and then put the token in authorize in the top right corner. After that you will be able to test all of our request within the documentation. To launch request within your app you need to do the same. Note: the 500 internal server error when launching without token is due to heroku.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: 'https://configurhouse-api.herokuapp.com',
      },
    ],
  },
  apis: ['./**/**/*.router.ts'],
};

export const specs = swaggerJsdoc(options);
