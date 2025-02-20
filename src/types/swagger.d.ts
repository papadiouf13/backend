declare module 'swagger-jsdoc' {
    const swaggerJsdoc: (options: any) => any;
    export default swaggerJsdoc;
  }
  
  declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
  
    export const serve: RequestHandler;
    export function setup(
      swaggerDoc: object,
      options?: object
    ): RequestHandler;
  }
  