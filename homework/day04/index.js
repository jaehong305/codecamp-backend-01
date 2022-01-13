import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import { options } from './swagger/config.js';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(options)));

app.get('/users', function (req, res) {
  res.send([
    {
      email: 'codecamp@google.com',
      name: '철수',
      phone: '01012341111',
      personal: '990901',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp1@google.com',
      name: '영희',
      phone: '01012342222',
      personal: '990902',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp2@google.com',
      name: '훈이',
      phone: '01012343333',
      personal: '990903',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp3@google.com',
      name: '짱구',
      phone: '01012344444',
      personal: '990904',
      prefer: 'https://google.com',
    },
    {
      email: 'codecamp9@google.com',
      name: '맹구',
      phone: '01012349999',
      personal: '990909',
      prefer: 'https://google.com',
    },
  ]);
});

app.get('/starbucks', function (req, res) {
  res.send([
    {
      name: '아메리카노',
      kcal: 5,
    },
    {
      name: '에스프레소',
      kcal: 1,
    },
    {
      name: '카페라떼',
      kcal: 2,
    },
    {
      name: '카푸치노',
      kcal: 3,
    },
    {
      name: '카라멜마키아또',
      kcal: 4,
    },
    {
      name: '카페모카',
      kcal: 5,
    },
    {
      name: '카페비엔나',
      kcal: 6,
    },
    {
      name: '콜드브루',
      kcal: 7,
    },
    {
      name: '프라푸치노',
      kcal: 8,
    },
    {
      name: '핫초코',
      kcal: 9,
    },
  ]);
});

app.listen(3000);
