import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Udsp38 Admin Portail',
      version: '1.0.0',
    },
  },
  apis: [path.join(process.cwd(), 'src/app/api/**/*.ts')],
});