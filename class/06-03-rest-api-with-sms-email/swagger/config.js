export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'swagger API명세서 연습',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.js'], // index.js기준으로 찾음
};
