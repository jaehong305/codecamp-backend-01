export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'mini-project',
      version: '1.0.0',
    },
  },
  apis: ['./swagger/*.js'], // index.js기준으로 찾음
};
