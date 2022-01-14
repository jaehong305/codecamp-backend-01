import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';
import getMenu from './menu.js';
import getUser from './user.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(options)));

app.get('/users', function (req, res) {
  getUser(res);
});

app.get('/starbucks', function (req, res) {
  getMenu(res);
});

app.listen(3005);
