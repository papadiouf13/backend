// @ts-ignore : Ignorer les types manquants pour swagger-jsdoc
import swaggerJsdoc from 'swagger-jsdoc';
// @ts-ignore : Ignorer les types manquants pour swagger-ui-express
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Interface pour la configuration Swagger
interface SwaggerOptions {
  definition: {
    openapi: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers: { url: string }[];
    components?: any;
    security?: any;
  };
  apis: string[];
}

const options: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Stream Management',
      version: '1.0.0',
      description: "Documentation de l'API pour la gestion des contenus Hero, Clients et Services",
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

// Configuration de Swagger
export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:5000/api-docs');
};
