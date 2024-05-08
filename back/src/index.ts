import { Express, NextFunction, Request } from 'express';
import './utils/config';
import './database/data-source';
import { v2 as cloudinary } from 'cloudinary';
const swaggerUi = require('swagger-ui-express');
const refParser = require('json-schema-ref-parser');
const swaggerDocument = require('./swagger.json');
const httpolyglot = require('httpolyglot');
import * as fs from 'fs';

import express = require('express');
var cors = require('cors');

import bodyParser = require('body-parser');
import router from './routes/';
import logger from './utils/logger';

cloudinary.config({
  api_secret: process.env.CLOUD_SECRET,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
});
const httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

swaggerDocument.servers = [
  { url: `http://localhost:8080`, description: 'HTTP' },
  { url: 'https://localhost:8080', description: 'HTTPS' },
];
const port = process.env.PORT || 8080;

const app: Express = express();
app.use(cors());
app.use((req: Request, response: express.Response, next: NextFunction) => {
  const url = process.env.FRONT_END_BASE_ROUTE.toString().slice(
    0,
    process.env.FRONT_END_BASE_ROUTE.toString().length - 1,
  );
  const origin = [
    url,
    `http://localhost:8080/api-hairunsi-docs/`,
    'https://localhost:8080/api-hairunsi-docs/',
  ];
  if (origin.includes(req.headers.origin))
    response.header('Access-Control-Allow-Origin', req.headers.origin);
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(router);

var options = {};

refParser.dereference(swaggerDocument).then((swaggerFile) => {
  app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + '/' });
  });
  app.use((req, res, next) => {
    swaggerDocument.host = req.get('host');
    next();
  });
  app.use('/api-hairunsi-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

  const server = httpolyglot.createServer(httpsOptions, app);
  server.listen(port, () => {
    logger.info(
      `http server is running ${
        process.env.NODE_ENV === 'dev' ? 'at (https || http)://localhost:' + port : ''
      }`,
    );
  });
});
